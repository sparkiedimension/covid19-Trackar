import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

interface Cases{
  name:string,
  cases:string,
  deaths:string
}

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {


  loadedAllData:Cases[]=[];

  loadedSingleData={
    name:"dummy",
    cases:"0",
    deaths:"0"
  }

  totalCase:string="";
  totalDeaths:string="";
  isState:boolean=false;

  constructor(private api:ApiService) { }
 
  ngOnInit() {
    // this.segmentChange(event)
    this.getWorldData();
    this.getTotalData();
  }

  getTotalData(){
    this.api.getTotalData().subscribe(res=>{
      this.totalCase=res["data"][0].confirmed;
      this.totalDeaths=res["data"][0].deaths;
    })
    err=>{
      console.log("Error in getTotalData" + err)
    };
    
  }


  getIndiaData(){
    var tempData:Cases[]=[];
    this.api.getIndiaData().subscribe(res=>{
     

      this.totalCase=res["data"].summary.total;
      this.totalDeaths=res["data"].summary.deaths;
      for(let k in res["data"]["regional"]){
        this.loadedSingleData.name=res["data"]["regional"][k].loc;
        this.loadedSingleData.cases=res["data"]["regional"][k].confirmedCasesIndian;
        this.loadedSingleData.deaths=res["data"]["regional"][k].deaths;
        tempData.push({...this.loadedSingleData});
        

      }  
      
      this.loadedAllData=tempData;
      // this.loadedAllData=this.loadedAllData.sort((a,b)=>{a["name"]<b["name"]?1:-1});
    })
  }



  getWorldData(){

    var tempData:Cases[]=[];

    this.api.getWorldData().subscribe(res=>{
      // console.log(res);
     
      
      for(let k in res["data"]){
        this.loadedSingleData.name=res["data"][k].name;
        this.loadedSingleData.cases=res["data"][k]["latest_data"].confirmed;
        this.loadedSingleData.deaths=res["data"][k]["latest_data"].deaths;
        tempData.push({...this.loadedSingleData});
        // console.log(this.loadedSingleData);
      //  console.log(res["data"][k]["latest_data"].confirmed);
        

      }
      this.loadedAllData=tempData;
      // this.loadedAllData=this.loadedAllData.sort((a,b)=>{a["name"]<b["name"]?1:-1});


    })
  }
  

  segmentChange(event){
    
    
    if(event.detail.value=='global'){
      
      this.getTotalData();
      this.getWorldData();
      this.isState=false;
    }
    else{
      this.getIndiaData();
      this.isState=true;
    }
      
    

    
  }
}
