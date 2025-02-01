import { TestBed } from "@angular/core/testing";
import { Products } from "../interfaces/products";
import { ProductsService } from "./products.service";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
describe(
  "Peticiones para los productos",
  ()=>{
    let _service: ProductsService;
    let _httpMock: HttpTestingController;
    const urlTest = "http://localhost:3000/productos";
    const nameTest = "Hoddie"
    const imageTest = "dkljaiukawh";
    const colectionTest = "Verano";
    const sizeTest = "L";
    const priceTest = 210000;
    beforeEach(()=>{
      TestBed.configureTestingModule({
        providers:[
          ProductsService,
          provideHttpClient(),
          provideHttpClientTesting()
        ]
      });
      _service = TestBed.inject(ProductsService);
      _httpMock = TestBed.inject(HttpTestingController);
    });
    afterAll(
      ()=>{
        _httpMock.verify();  
      }
    )
    // PETICION POST
    it(
      "Post para crear el producto",
      ()=>{
        const newProduct = { Nombre: nameTest, Imagen: imageTest, Coleccion: colectionTest, Tallas: sizeTest, Precio: priceTest };
        _service.postProducts(newProduct).subscribe(
          (products)=>{
            expect(products).toEqual(newProduct);
          }
        )
        const peticion = _httpMock.expectOne(urlTest + "/crear")
        expect(peticion.request.method).toBe("POST")
        expect(peticion.request.body).toEqual(newProduct);
        peticion.flush(newProduct)
      }
    );

    // PETICION GET
    it(
      "Para obtener los productos, GET",
      ()=>{
        const getProducts = { nameTest, imageTest, colectionTest, sizeTest, priceTest };
        _service.getProducts().subscribe(
          (products) => {
            expect(products).toEqual(getProducts);
          }
        )
        const peticion = _httpMock.expectOne(urlTest + "/obtener")
        expect(peticion.request.method).toBe("GET")
        peticion.flush(getProducts)
      }
    )

    // PETICON PUT
    it(
      "Actualizar un producto con PUT",
      ()=>{
        const newProduct = {Nombre: nameTest, Imagen: imageTest, Coleccion: colectionTest, Tallas: sizeTest, Precio: priceTest, _id: "jncmwiuehdfw"};
        const updatedProduct = { ...newProduct, colectionTest: "Otoño"};
        _service.putProducts(updatedProduct, newProduct._id).subscribe(
          (products)=>{
            expect(products).toEqual(updatedProduct);
          }
        )
        const peticion = _httpMock.expectOne(urlTest + "/actualizar" + updatedProduct._id)
        expect(peticion.request.method).toBe("PUT")
        peticion.flush(updatedProduct)
      }
    )

    // DELETE
    it(
      "Eliminar un producto con DELETE",
      ()=>{
        const newProduct = {Nombre: nameTest, Imagen: imageTest, Coleccion: colectionTest, Tallas: sizeTest, Precio: priceTest, _id: "jncmwiuehdfw"};
        _service.deleteProducts(newProduct._id).subscribe(
          (products) => {
            expect(products).toEqual(newProduct);
          }
        )
        const peticion = _httpMock.expectOne(urlTest + "/eliminar" + newProduct._id)
        expect(peticion.request.method).toBe("DELETE")
        peticion.flush(newProduct)
      }
    )
  }
);