import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
//---------------------------------------------------------------------------------------------------------------------------------  
describe(
    "Pruebas para el login service",
    ()=>{
        let _loginService: LoginService;
        let _httpMock: HttpTestingController;
        const urlTest = "http://localhost:3000/usuarios";
        const nameTest = "Santiago Andres"
        const emailTest = "santiago@user";
        const phoneTest = 74833478;
        const passwordTest = "locky";
        const tokenTest = "jkhwdkjwhadw";

        beforeEach(()=>{
          TestBed.configureTestingModule({
            providers: [
              LoginService,
              provideHttpClient(),
              provideHttpClientTesting()
            ]});
          _loginService = TestBed.inject(LoginService);
          _httpMock = TestBed.inject(HttpTestingController);
        })
        afterAll(
          ()=>{
            _httpMock.verify();
          }
        )
//---------------------------------------------------------------------------------------------------------------------------------  
it(
    "POST para el inicio de sesion",
    ()=>{
      const mockRespuesta = {
        mensaje: "El inicio de sesion fue realizado con exito",
        token: tokenTest
      }
      _loginService.inicioSesion(emailTest, passwordTest).subscribe(
        (res)=>{
          expect(res).toEqual(mockRespuesta);
        }
      )
      const peticion = _httpMock.expectOne(urlTest)
      expect(peticion.request.method).toBe("POST")
      peticion.flush(mockRespuesta)
    }
  )

  it(
    "Obtener el token almacenado con la peticion",
    ()=>{
      localStorage.setItem("token", tokenTest)
      expect(_loginService.obtenerToken()).toBe(tokenTest);
    }
  )
  it(
    "Validacion de que el usuario este logeado",
    ()=>{
      localStorage.setItem("token", tokenTest)
      expect(_loginService.isLoged()).toBeTruthy();
    }
  )
  it(
    "Cerrar Sesion",
    ()=>{
      _loginService.logOut();
      expect(localStorage.getItem("token")).toBeNull();
      spyOn(window, "alert");
      _loginService.logOut();
      expect(window.alert).toHaveBeenCalledWith("Cierre de sesion realizado de forma exitosa");
    }
  )

  it(
    "En dado caso de que sea admin",
    ()=>{
      const tokenAdmin = "ifawhifuhafiulbeglhfnuisbfviuswfebLAIUFBEF"; 
      localStorage.setItem("token", tokenAdmin);
      expect(_loginService.esAdmin()).toBeTruthy();
    }
  )
}
)