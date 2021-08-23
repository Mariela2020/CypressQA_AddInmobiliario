Feature: AddInmobiliario
 
  Como usuario quiero crear una cotización.

 @cotizar
  Scenario: Ingresar al sistema AddInmobiliario y Crear una cotización
    Given El usuario se encuentra en la página de AddInmobiliario
      And Debe iniciar cuenta con credenciales de valida
      And Comparar el valor de la UF
      And Hace click sobre el menú gestión venta - Cotizaciones - Crear Cotizaciones
     When Cuando el usuario ingresa el Rut del Cliente
      And Selecciona el inmueble principal y secundario
      And Selecciona el financiamiento 
      And Selecciona el medio de llegada 
      And Hace click al botón Guardar
     Then Se debe redireccionar al Detalle de la cotización y la crea 