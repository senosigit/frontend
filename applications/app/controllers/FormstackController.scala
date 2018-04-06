package controllers

import conf.Configuration
import common._
import model._
import play.api.libs.ws.{WSClient, WSResponse}
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.json.Json

import scala.concurrent._

class FormstackController(
  val controllerComponents: ControllerComponents,
  val wsClient: WSClient,
)(implicit context: ApplicationContext)
  extends BaseController with ImplicitControllerExecutionContext with Logging {

  val root = "https://www.formstack.com/api/v2/"
  val endpoint = "/submission.json"
  val token = "2d174e190adf4634bec99642b770b2c5" // Configuration.formstack.oAuthToken

  def formSubmit() = Action.async { implicit request: Request[AnyContent] =>
    val body: AnyContent = request.body
    val formId: String = body.asFormUrlEncoded.map(formData => formData("id")).get.last

    println("formId", formId)

    val jsonBody: Option[JsValue] = body.asFormUrlEncoded.map( formData => {
      val formattedData = formData.keys.foldLeft(Map.empty[String, String])((map, key) => {
        val formValue: Option[String] = formData get key map(_.last)
        map + (key -> formValue.get)
      })
      Json.toJson(formattedData)
    })

    jsonBody.map { json =>
      sendToFormstack(json, formId).flatMap { res =>
        println(res)
        if(res.status == 201) {
          Future.successful(Ok("Thanks for submitting your story"))
//          Ok(views.html.formstack.formstackForm(page, formstackForm))
        }
        else {
          Future.failed( new Throwable("Sorry your story couldn't be sent"))}
      }
    }.getOrElse{
      Future.failed( new Throwable("Sorry no data was sent"))
    }
  }

  def sendToFormstack(data: JsValue, formId: String): Future[WSResponse] = {
    wsClient.url(root + formId + endpoint).withHttpHeaders(
      "Authorization" -> s"Bearer $token",
      "Accept" -> "application/json",
      "Content-Type" -> "application/json"
    ).post(data)
  }

}
