import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  indiaUrl="https://api.rootnet.in/covid19-in/stats/latest";
  apiUrl="https://corona-api.com/timeline";
  worldUrl="https://corona-api.com/countries";


  getTotalData(){  
    return this.http.get(this.apiUrl);  
  }
  getIndiaData(){
    return this.http.get(this.indiaUrl);
  }
  getWorldData(){
    return this.http.get(this.worldUrl);
  }


}
