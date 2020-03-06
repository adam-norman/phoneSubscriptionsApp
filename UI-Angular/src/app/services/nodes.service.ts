import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nodes } from '../models/Nodes';
import { Packages } from '../models/Packages';
import { Observable } from 'rxjs';
import { SubNodes } from '../models/SubNodes';
@Injectable({
  providedIn: 'root'
})
export class NodesService {
url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  addNewNode(nodeObj: Nodes) {
    return this.http.post<Nodes>(this.url.concat('/addNode'), nodeObj);
  }
  updateSubNode(subNodeObj: SubNodes) {
    return this.http.post<SubNodes>(this.url.concat('/updateSubNode'), subNodeObj);
  }
  updateSubNodeMonth(subNodeObj: SubNodes) {
    return this.http.post<SubNodes>(this.url.concat('/updateSubNodeMonth'), subNodeObj);
  }
  resetSubNodeMonth(){
    return this.http.get(this.url.concat('/resetUpdateSubNodeMonth'));
  }
  addNewSubNode(nodeObj: SubNodes) {
    return this.http.post<SubNodes>(this.url.concat('/addSubNode'), nodeObj);
  }
  updateNode(nodeObj: Nodes) {
    return this.http.post<Nodes>(this.url.concat('/updateNode'), nodeObj);
  }
  deleteNode(nodeObj: Nodes) {
    return this.http.post<Nodes>(this.url.concat('/deleteNode'), nodeObj);
  }
  deleteSubNode(subNodeObj: SubNodes) {
    return this.http.post<SubNodes>(this.url.concat('/deleteSubNode'),subNodeObj);
  }
  addNewPackage(nodeObj: Packages) {
    return this.http.post<Packages>(this.url.concat('/addPackage'), nodeObj);
  }
  getNodeById(nodeId: number) {
    return this.http.post<Nodes>(this.url, nodeId);
  }
  deleteNodeById(nodeId: number) {
    return this.http.post<any>(this.url, nodeId);
  }

  getNodesList(): Observable<Nodes[]> {
    return this.http.get<Nodes[]>(this.url.concat('/getNodesList'));
  }
  getSubNodesList(): Observable<Nodes[]> {
    return this.http.get<Nodes[]>(this.url.concat('/getSubNodesList'));
  }
  getSubNodesListNodeId(subNodeObj:SubNodes): Observable<SubNodes[]> {

//return this.http.post('/api/ordersspecyfic', ids, options)
    return this.http.post<SubNodes[]>(this.url.concat('/getSubNodesListNodeId'),subNodeObj);
  }
  getPackagesList(): Observable<Packages[]> {
    return this.http.get<Packages[]>(this.url.concat('/getPackagesList'));
  }
 
  updatePackage(nodeObj: Packages) {
    return this.http.post<Packages>(this.url.concat('/updatePackage'), nodeObj);
  }
  deletePackage(nodeObj: Packages) {
    return this.http.post<Packages>(this.url.concat('/deletePackage'), nodeObj);
  }

}

