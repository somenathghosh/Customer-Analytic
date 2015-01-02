


window.HM = function  (argument) {
    
    var self = this;

    this.data;

    var a = ["Information Management","Big Data","Analytics","Quality Assurance","Automation", "Vendor Consolidation", "Production Support", "Initiative", "Architecture","Data Center Operations","Strategy", "Migration","Simplification", "Mobility", "BPM", "Products/Solutions","Offshoring", "Budget Constraints","Ramp downs", "Ramp up", "Resource Optimization","Portfolio Rationalization", "Next Gen Skills", "BACS" ];
    
    var b = [{"category" : "Information Management","subCat":["Data Management","SSIS","Informatica","Datastage","Data Privacy","Data Quality","ETL","Datawarehouse","Master Data","Reference Data","Data Lineage","Data Modeling","Metadata"]},{"category" : "Big Data","subCat":["Big Data","Hadoop","Cloudera","Cassandra"]},{"category":"Analytics","subCat":["Analytics","Algorithms","Data Science","Data Scientist","SAS","Revolution R"]},{"category" :"Quality Assurance", "subCat" : ["Testing","AssurANCE","HP QC","JMeter","LoanRunner"]},{"category" :"Automation","subCat":["Automation"]}, {"category" :"Vendor Consolidation","subCat":["Vendor consolidation","Vendor Rationalization"]}, {"category" : "Production Support","subCat":["Production Support"]}, {"category" :"Initiative","subCat":["Initiative"]}, {"category" :"Architecture", "subCat":["Architecture"]},{"category" :"Data Center Operations", "subCat":["Data Center Operations"]},{"category" :"Strategy", "subCat":["Strategic"]}, {"category" :"Migration","subCat":["Migration"]},{"category" :"Simplification","subCat":["Simplification"]}, {"category" :"Mobility","subCat":["Mobile","Angular","Mobility","Tablet","Android","iOS"]}, {"category" :"BPM","subCat":["Appian", "Pega","jBPM"]}, {"category" :"Products/Solutions","subCat":["Mastercraft","Tools","Tool"]},{"category" :"Offshoring","subCat":["Offshore movement","Movement to Offshore"]}, {"category" :"Budget Constraints","subCat":["Budget constraint", "Budget cut", "Funding cut","Financial challenges","Reductions","funding challenges","Budget Issues"]},{"category" :"Ramp downs","subCat":["Ramp downs"]}, {"category" :"Ramp up","subCat":["Ramp up"]}, {"category" :"Resource Optimization","subCat":["Resource Optimization"]},{"category" :"Portfolio Rationalization","subCat":["Application portfolio"]}, {"category" :"Next Gen Skills","subCat":["Python","Scala","NodeJS","AngularJS"]}, {"category" :"BACS","subCat":["BACI","BACS"]} ];

    
    

    this.withData = function (d){

        var obj = [];
        var people = [];
        d.forEach(function(element, index){
            
            if(people.indexOf(element.name) < 0){
                people.push(element.name);
                obj.push({
                    "name": element.name,
                    "text": element.rank

                });
              
            }
            else{
                obj[people.indexOf(element.name)].text = (obj[people.indexOf(element.name)].text).concat(element.rank);
            }
            
        });
        this.data = obj;
        
        return self;
    }

    this.generateData = function (data){

        //var im, bd, ana, qa, auto,vc,ps,init, arch, dco,stra, migra, simpl, mob, bpm, prod, off,bc, rd, ru, ro, pr, ngs, bacs;

        //var ar = new Array(a.length);
        
        data.forEach(function(element){
          element.counts = [];
          for(var i = 0; i<b.length;i++){
            element.counts.push(0);
          }
          element.text.forEach(function(word){
            b.forEach(function(category, index){
               var upperCaseNames = category.subCat.map(function(value) {
                  return value.toUpperCase();
               });
              if(upperCaseNames.indexOf(word.toUpperCase())>=0){
                element.counts[index]++;
              }
            });
          });
          
            // calculation
        });
        console.log(data);
    };



    this.draw = function (personCounts) {
        
    
        $.ajax({

            type: 'GET',
            contentType: 'application/json',
            url: '/persons',           
            success: function(dataPersons) {
                
                console.log(dataPersons);
                var radials = [];
                dataPersons.forEach(function(ele){

                    radials.push(ele.name);

                });
              

                var chart = circularHeatChart()
                    .segmentHeight(60)
                    .innerRadius(40)
                    .numSegments(a.length)
                    .radialLabels(radials)
                    .segmentLabels(a)
                    .margin({top: 60, right: 0, bottom: 20, left: 10});
                /*                    0.0,0.096146,0.076414,0.334734,0.132583,0.135422,0.060884,0.768601,0.230771,0.07572,0.210855,0.090938,0.094296,0.290368,0.093755,0.099166,0.429278,0.962314,0.43833,0.244464,0.550621,0.173093,0.103659,0.0773,
                    0.265913,0.099811,0.076164,0.3154,0.146557,0.108531,0.421608,0.120872,0.061825,0.101988,0.095364,0.365022,0.096741,0.095962,0.06409,0.300409,0.102083,0.134949,0.535842,0.224584,0.227262,0.28274,0.11842,0.062601,
                    0.103968,0.088054,0.069683,0.141973,0.106082,0.135513,0.09906,0.099516,0.31927,0.097133,0.08595,0.067532,0.096042,0.09789,0.059053,0.11167,0.137408,0.109005,0.365752,0.179085,0.135975,0.199275,0.144186,0.053961,
                    0.088226,0.09218,0.059777,0.125663,0.136192,0.121279,0.146825,0.267907,0.113706,0.09266,0.105833,0.130221,0.09695,0.078355,0.067088,0.093888,0.096131,0.152373,0.072957,0.095516,0.091731,0.14403,0.113989,0.089659,
                    0.089808,0.085082,0.057542,0.09864,0.091152,0.066592,0.20529,0.12785,0.077798,0.071004,0.094316,0.088963,0.054368,0.091964,0.095114,0.071649,0.076153,0.150208,0.15751,0.065801,0.087791,0.100653,0.121987,0.161462,
                    0.096507,0.093314,0.075191,0.07723,0.091846,0.095587,0.053434,1.017331,1.458327,0.120566,0.107582,0.139082,0.112224,0.159757,0.252278,0.161521,0.124628,0.080985,0.634034,0.248268,0.20864,0.14324,0.174345,0.165649,
                    0.116201,0.119975,0.133551,0.138756,0.128587,0.171464,1.328931,0.318976,0.436703,0.10,0.116201,0.119975,0.133551,0.138756,0.128587,0.171464,1.328931,0.318976,0.436703,0.10,
                    0.116201,0.119975,0.133551,0.138756,0.128587,0.171464,1.328931,0.318976,0.436703,0.10,0.436703,0.10, 0.116201,0.119975,0.133551,0.138756,0.128587,0.171464,1.328931,0.318976,0.436703,0.10,0.436703,0.10,
                    0.116201,0.119975, 0.116201,0.119975*/
                var energyData = [];
                personCounts.forEach(function (person){
                  energyData = energyData.concat(person.counts);
                });

                d3.select('#energychart')
                    .selectAll('svg')
                    .data([energyData])
                    .enter()
                    .append('svg')
                    .call(chart);



            },

            error: function (error) {
              alert('error');
            }
      
        }); 

    }
      

}



