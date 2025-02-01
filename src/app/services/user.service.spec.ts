import { TestBed } from "@angular/core/testing";
import { User } from "../interfaces/user";
import { UserService } from "./user.service";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
//---------------------------------------------------------------------------------------------------------------------------------  
describe(
    "Pruebas para las peticiones de los Usuarios",
    ()=>{
        let _service: UserService;
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
              UserService,
              provideHttpClient(),
              provideHttpClientTesting()
            ]});
          _service = TestBed.inject(UserService);
          _httpMock = TestBed.inject(HttpTestingController);
        })
        afterAll(
          ()=>{
            _httpMock.verify();
          }
        )
//---------------------------------------------------------------------------------------------------------------------------------  
        // PETICION POST 
        it(
          "POST PARA LA CREACION DE UN USUARIO",
          ()=>{
            const newUser = { Nombre: nameTest, Correo: emailTest, Telefono: phoneTest, Contrasena: passwordTest };
            _service.postUsers(newUser).subscribe(
              (user) => {
                expect(user).toEqual(newUser);
              }
            )
            const peticion = _httpMock.expectOne(urlTest + "/crear")
            expect(peticion.request.method).toBe("POST")
            expect(peticion.request.body).toEqual(newUser);
            peticion.flush(newUser)
          }
        )
//---------------------------------------------------------------------------------------------------------------------------------     
        // PETICION GET
        it(
          "GET PARA LA OBTENCION DE USUARIOS",
          ()=>{
            const getUser = { nameTest, emailTest, phoneTest, passwordTest };
            _service.getUsers().subscribe(
              (user)=>{
                expect(user).toEqual(getUser);
              }
            )
            const peticion = _httpMock.expectOne(urlTest + "/obtener")
            expect(peticion.request.method).toBe("GET")
            peticion.flush(getUser)
          }
        )
//---------------------------------------------------------------------------------------------------------------------------------    
        // PETICION PUT
        it(
          "GET PARA ACTUALIZAR UN USUARIO",
          ()=>{
            const newUser = { Nombre: nameTest, Correo: emailTest, Telefono: phoneTest, Contrasena: passwordTest, _id: "duigqduadw" };
            const updatedUser = { ...newUser, Nombre: "Julian"};
            _service.putUsers(updatedUser, newUser._id).subscribe(
              (user)=>{
                expect(user).toEqual(updatedUser);
              }
            )
            const peticion = _httpMock.expectOne(urlTest + "/actualizar" + newUser._id)
            expect(peticion.request.method).toBe("PUT")
            peticion.flush(updatedUser)
          }
        )
//--------------------------------------------------------------------------------------------------------------------------------      
        // PETICION DELETE
        it(
          "DELETE PARA ELIMINAR UN UDUARIO",
          ()=>{
            const newUser = { Nombre: nameTest, Correo: emailTest, Telefono: phoneTest, Contrasena: passwordTest, _id: "duigqduadw" };
            _service.deleteUsers(newUser._id).subscribe(
              (user)=>{
                expect(user).toEqual(newUser);
              }
            )
            const peticion = _httpMock.expectOne(urlTest + "/eliminar" + newUser._id)
            expect(peticion.request.method).toBe("DELETE")
            peticion.flush(newUser)
          }
        )
      });