import {Given} from "cypress-cucumber-preprocessor/steps"

const d = new Date
  const date = [d.getMonth() + 1,
    d.getDate(),
    d.getFullYear()].join('/') 

  const hora = [d.getHours(),
    d.getMinutes(),
    d.getSeconds()].join(':')

Given('Obtiene y registra las metricas', () =>{

    cy.readFile('cypress/results/mochawesome.json').then((data) =>{
            cy.log(data)
            var fecha = data.stats.end
            cy.log(fecha)
            cy.log(hora)
            var duracion = data.results[0].suites[0].tests[0].duration
            cy.log(duracion)
            var resultado = data.results[0].suites[0].tests[0].state
            cy.log(resultado)
        
           
            cy.request({
                url: 'https://coda.io/apis/v1/docs/WvYdhdLDJH/tables/data_cy_addinmobiliario/rows', 
                method: 'POST',
                headers: {
                  'Authorization': 'Bearer fdaf70a0-204e-48f2-9c6f-2aa8156f847f',
                  'content-type': 'application/json'
                  },
                body : {
                  'rows': [
                        {
                      'cells': [
                               {'column': 'c-eJBi6C1NWP', 'value': date},
                               {'column': 'c-xXUiCNHDFq', 'value': hora},
                               {'column': 'c-XXrKXsDTCt', 'value': duracion},
                               {'column': 'c-svlLfr1zbU', 'value': resultado}
                                                             
                              ]
                      }
                  ] 
                }
                
              }).then((response) => {
                 expect(response.status).to.eq(202)
               })

               
           
        })
  
})
    