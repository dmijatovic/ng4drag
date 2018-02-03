import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DragDropApi {
  constructor(){
    console.log('DragDropApi...started');
  }

  getSegmentFilterList(){
    return new Observable((obs)=>{
      obs.next(fields.result);
    });
  }

}



const fields={
  "result":[{
    "id": "80d192bd-89d8-4837-8ebc-0eb07bde47ec",
    "name": "Customer details",
    "fields":[{
      "id": "e0189624-0017-482f-99fb-ec24b73e43b1",
			"name": "Registration Date",
			"fieldType": "DateTime",
			"fieldDescription": null,
			"operators": ["=", ">", "<", ">=", "<=", "BETWEEN", "EMPTY"],
			"values": []
    },{
      "id": "e0189624-0017-482f-99fb-ec24b73e43b2",
			"name": "Gender",
			"fieldType": "Categorical",
			"fieldDescription": null,
			"operators": ["=", "IN", "NOT", "EMPTY"],
			"values": ["Male","Female","Unknown"]
    },{
      "id": "e0189624-0017-482f-99fb-ec24b73e43b3",
			"name": "Birthday",
			"fieldType": "DateTime",
			"fieldDescription": null,
			"operators": ["=", ">", "<", ">=", "<=", "BETWEEN", "EMPTY"],
			"values": []
    },{
      "id": "18d8c088-2e06-4d59-beb6-bb3b7b5828ca",
			"name": "Age",
			"fieldType": "Integer",
			"fieldDescription": null,
			"operators": ["=", ">", "<", ">=", "<=", "<>", "BETWEEN", "IN", "EMPTY"],
			"values": []
    },{
			"id": "19e24afe-8c36-4500-978a-6f692b42ab70",
			"name": "Country",
			"fieldType": "String",
			"fieldDescription": null,
			"operators": ["=", "STARTSWITH", "ENDSWITH", "CONTAINS", "IN", "EMPTY", "LENGTH"],
			"values": []
		},{
      "id": "18d8c088-2e06-4d59-beb6-bb3b7b5828cb",
			"name": "Balance",
			"fieldType": "Integer",
			"fieldDescription": null,
			"operators": ["=", ">", "<", ">=", "<=", "<>", "BETWEEN", "IN", "EMPTY"],
			"values": []
    }]
  },{
    "id": "80d192bd-89d8-4837-8ebc-0eb07bde47ec",
    "name": "Transation",
    "fields":[{
			"id": "18d8c088-2e06-4d59-beb6-bb3b7b5828ca",
			"name": "TransactionYear",
			"fieldType": "Integer",
			"fieldDescription": null,
			"operators": ["=", ">", "<", ">=", "<=", "<>", "BETWEEN", "IN", "EMPTY"],
			"values": []
		}, {
			"id": "e0189624-0017-482f-99fb-ec24b73e43b0",
			"name": "TransactionTime",
			"fieldType": "DateTime",
			"fieldDescription": null,
			"operators": ["=", ">", "<", ">=", "<=", "BETWEEN", "EMPTY"],
			"values": []
		}, {
			"id": "9ae3bc9d-e420-4b91-b4b9-2d4b6c6886fc",
			"name": "StoreId",
			"fieldType": "Integer",
			"fieldDescription": null,
			"operators": ["=", ">", "<", ">=", "<=", "<>", "BETWEEN", "IN", "EMPTY"],
			"values": []
		}, {
			"id": "e476c889-4eb6-4113-af7e-9c5e2879cc64",
			"name": "KassaId",
			"fieldType": "Integer",
			"fieldDescription": null,
			"operators": ["=", ">", "<", ">=", "<=", "<>", "BETWEEN", "IN", "EMPTY"],
			"values": []
		}, {
			"id": "bffca6f8-4299-4cfd-8d70-cf2e3b38b6df",
			"name": "ReceiptNumber",
			"fieldType": "String",
			"fieldDescription": null,
			"operators": ["=", "STARTSWITH", "ENDSWITH", "CONTAINS", "IN", "EMPTY", "LENGTH"],
			"values": []
		}, {
			"id": "19e24afe-8c36-4500-978a-6f692b42ab70",
			"name": "CardNumber",
			"fieldType": "String",
			"fieldDescription": null,
			"operators": ["=", "STARTSWITH", "ENDSWITH", "CONTAINS", "IN", "EMPTY", "LENGTH"],
			"values": []
		}, {
			"id": "8331007c-d4e1-4113-81a8-3f28577aefe8",
			"name": "Quantity",
			"fieldType": "Integer",
			"fieldDescription": null,
			"operators": ["=", ">", "<", ">=", "<=", "<>", "BETWEEN", "IN", "EMPTY"],
			"values": []
		}, {
			"id": "1b5617aa-8485-45e9-a04c-0afdf37b82d9",
			"name": "gecacluleerd",
			"fieldType": "Integer",
			"fieldDescription": null,
			"operators": ["=", ">", "<", ">=", "<=", "<>", "BETWEEN", "IN", "EMPTY"],
			"values": []
		}, {
			"id": "97b0a0b0-6282-4c1d-b7bf-19f36e07a049",
			"name": "gerealiseerd",
			"fieldType": "Integer",
			"fieldDescription": null,
			"operators": ["=", ">", "<", ">=", "<=", "<>", "BETWEEN", "IN", "EMPTY"],
			"values": []
		}, {
			"id": "7db5391a-1ea1-4591-9148-137b1b424f33",
			"name": "kostprijs",
			"fieldType": "Integer",
			"fieldDescription": null,
			"operators": ["=", ">", "<", ">=", "<=", "<>", "BETWEEN", "IN", "EMPTY"],
			"values": []
		}, {
			"id": "9bd4d686-6704-4f5f-b4c6-681fc3a6ee79",
			"name": "ProcessStatus",
			"fieldType": "Integer",
			"fieldDescription": null,
			"operators": ["=", ">", "<", ">=", "<=", "<>", "BETWEEN", "IN", "EMPTY"],
			"values": []
    }]
  }]
}
