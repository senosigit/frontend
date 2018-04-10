package commercial.controllers

import java.nio.ByteBuffer
import java.util.concurrent.TimeUnit

import com.amazonaws.auth.profile.ProfileCredentialsProvider
import com.amazonaws.services.kinesisfirehose.model.{PutRecordRequest, Record}
import com.amazonaws.services.kinesisfirehose.{AmazonKinesisFirehoseAsync, AmazonKinesisFirehoseAsyncClientBuilder}
import common.Logging
import conf.Configuration.aws.region
import conf.switches.Switches.prebidAnalytics
import model.Cached.WithoutRevalidationResult
import model.{CacheTime, Cached, TinyResponse}
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toBytes
import play.api.mvc._

class PrebidAnalyticsController(val controllerComponents: ControllerComponents) extends BaseController with Logging {

  // todo credentials
  // todo cloudform firehose
  private val firehose: AmazonKinesisFirehoseAsync = {
    val credentialsProvider = new ProfileCredentialsProvider("developerPlayground")
    AmazonKinesisFirehoseAsyncClientBuilder
      .standard()
      .withCredentials(credentialsProvider)
      .withRegion(region)
      .build()
  }

  // todo
  private val deliveryStreamName = "KelvinTestFirehose"

  private def putRequest(data: Array[Byte]): PutRecordRequest = {
    val record = new Record().withData(ByteBuffer.wrap(data))
    new PutRecordRequest().withDeliveryStreamName(deliveryStreamName).withRecord(record)
  }

  private def serve404[A](implicit request: Request[A]) =
    Cached(CacheTime.NotFound)(WithoutRevalidationResult(NotFound))

  def insert(): Action[JsValue] = Action(parse.json) { implicit request =>
    if (prebidAnalytics.isSwitchedOn) {
      firehose.putRecordAsync(putRequest(toBytes(request.body)))
      TinyResponse.noContent()
    } else
      serve404
  }

  def getOptions: Action[AnyContent] = Action { implicit request =>
    if (prebidAnalytics.isSwitchedOn)
      TinyResponse.noContent(Some("OPTIONS, PUT"))
    else
      serve404
  }

  def test(): Action[AnyContent] = Action { _ =>
    val data = "test data 6" + "\n"

    val result = firehose.putRecordAsync(putRequest(data.getBytes))
    println(result.get(10, TimeUnit.SECONDS))

    Ok("yes")
  }
}
