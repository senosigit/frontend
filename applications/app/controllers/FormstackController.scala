package controllers

import conf.Configuration
import contentapi.ContentApiClient
import common._
import model._
import play.api.libs.ws.{WSClient, WSResponse}
import play.api.mvc._
import play.api._
import play.api.libs.json._

import scala.concurrent._

class FormstackController(
  val controllerComponents: ControllerComponents,
  val wsClient: WSClient,
)(implicit context: ApplicationContext)
  extends BaseController with ImplicitControllerExecutionContext with Logging {

  val root = "https://www.formstack.com/api/v2/"
  val id = "2994970" //extract this from the formData/
  val endpoint = "/submission.json"
  val token = Configuration.formstack.oAuthToken

  def formSubmit() = Action.async { implicit request: Request[AnyContent] =>
    println("---hits this function---")
    println(request.body)
    request.body.asJson.fold(Future.successful(BadRequest("Unable to process")))
    { json =>
      println(json)
      sendToFormstack(json).flatMap { res =>
        if(res.status == 201) Future.successful(Ok("Thanks for submitting your story"))
        else { Future.failed( new Throwable("Sorry your story couldn't be sent"))}
      }
    }
  }

  def sendToFormstack(data: JsValue): Future[WSResponse] = {
    wsClient.url(root + id + endpoint).withHttpHeaders(
      "Authorization" -> s"Bearer $token",
      "Accept" -> "application/json",
      "Content-Type" -> "application/json"
    ).post(data)
  }

}
