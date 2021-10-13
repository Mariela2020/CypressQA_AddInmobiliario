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

Given('Obtiene y registra las metricas Testproject', () =>{

  Cypress.config('baseUrl', 'https://api.testproject.io/v2')

  cy.request({
          url: "/projects/br1AckSWwkavretXdaERbQ/jobs/AMpFmdxxqkW3EHyo-sfL5g/reports/latest?details=false&format=TestProject",
          method: "GET",
          headers: {
             "authorization": "ZUaxMZ3ClDHBjrWtH9mKX8LNIeO3iC7cUmgDx3LjHqA1"
          }
      }).then((response) => {

         cy.writeFile('cypress/fixtures/testproject.json', response.body)
         
         cy.readFile('cypress/fixtures/testproject.json').then((datareporte) =>{
           var test = datareporte.jobName
           cy.log(test)
           var resultado = datareporte.resultType
           cy.log(resultado)
           var browserA= datareporte.testResults[0].targets[0].targetName
            var browser1 = browserA.replace(/[0-9.]/g, '')
            cy.log(browser1)
            var duration1= datareporte.testResults[0].targets[0].duration
            var duration_ms= duration1.substring(9)
            var duration2= datareporte.testResults[0].targets[0].duration
            var duration_min= duration2.slice(4, 5)
            var duration3= datareporte.testResults[0].targets[0].duration
            var duration_sec= duration3.slice(6, 8)
            var minuto= parseInt(duration_min)
            var segundo= parseInt(duration_sec)
            var duration4 = (minuto * 60) + segundo
           // var duration_final = duration4 + "." + duration_ms
            var duration_final = duration4 + duration_ms
            var duration1_final1= parseFloat(duration_final)
            cy.log(duration1_final1)

          /*  var browserB= datareporte.testResults[0].targets[1].targetName
            var browser2 = browserB.replace(/[0-9.]/g, '')
            var duration5= datareporte.testResults[0].targets[1].duration
            var duration2_ms= duration5.substring(9)
            var duration6= datareporte.testResults[0].targets[1].duration
            var duration2_min= duration6.slice(4, 5)
            var duration7= datareporte.testResults[0].targets[1].duration
            var duration2_sec= duration7.slice(6, 8)
            var minuto2= parseInt(duration2_min)
            var segundo2= parseInt(duration2_sec)
            var duration8 = (minuto2 * 60) + segundo2
            var duration_final2 = duration8 + "." + duration2_ms
            var duration2_final2= parseFloat(duration_final2)
            
            var browserC= datareporte.testResults[0].targets[2].targetName
            var browser3 = browserC.replace(/[0-9.]/g, '')
           // var duration3= datareporte.testResults[0].targets[2].duration
           // var duration30= duration3.substring(6)
            var duration9= datareporte.testResults[0].targets[2].duration
            var duration3_ms= duration9.substring(9)
            var duration10= datareporte.testResults[0].targets[2].duration
            var duration3_min= duration10.slice(4, 5)
            var duration11= datareporte.testResults[0].targets[2].duration
            var duration3_sec= duration11.slice(6, 8)
            var minuto3= parseInt(duration3_min)
            var segundo3= parseInt(duration3_sec)
            var duration12 = (minuto3 * 60) + segundo3
            var duration_final3 = duration12 + "." + duration3_ms
            var duration3_final3= parseFloat(duration_final3)*/
              
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
                             {'column': 'c-XXrKXsDTCt', 'value': duration1_final1},
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

})

    