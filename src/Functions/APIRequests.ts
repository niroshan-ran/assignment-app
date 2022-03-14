import { Person } from "../Model/Person"
import { ResponseObjRandomAgeAPI } from "../Model/ResponseObjRandomAgeAPI";
import { ResponseObjRandomPeopleAPI } from "../Model/ResponseObjRandomPeopleAPI";
import { NUMBER_OF_RANDOM_PERSONS } from "../Utilities/Constants";


async function requestAPI<TResponse>(
    url: string,

    config: RequestInit = {}

): Promise<TResponse> {


    const response = await fetch(url, config);
    const data = await response.json();
    return data as TResponse;


}

export let GetThreeRandomPeople = async () => {

    let response = await requestAPI<ResponseObjRandomPeopleAPI>("https://randomuser.me/api/?results=".concat(String(NUMBER_OF_RANDOM_PERSONS)).concat("&nat=us,gb"));

    let personsList: Person[] = [];

    for (let i = 0; i < NUMBER_OF_RANDOM_PERSONS; i++) {
        let dob = new Date(response.results[i].dob.date);
        let personObj: Person = {
            Title: response.results[i].name.title,
            FirstName: response.results[i].name.first,
            LastName: response.results[i].name.last,
            City: response.results[i].location.city,
            DoB: String().concat(dob.getDate().toString()).concat("/").concat(dob.getMonth().toString()).concat("/").concat(dob.getFullYear().toString()),
            ImageURL: response.results[i].picture.large
        }
        personsList.push(personObj)
    }

    return personsList;


}

export let GetRandomAgeByName = async (personObjList: Person[]) => {
    let url = "https://api.agify.io/?";
    for (let i = 0; i < NUMBER_OF_RANDOM_PERSONS; i++) {
        url = url.concat("name[]=".concat(personObjList[i].FirstName.toLowerCase())).concat("&");
    }

    let response = await requestAPI<ResponseObjRandomAgeAPI>(url);

    let personsList: Person[] = [];

    for (let i = 0; i < NUMBER_OF_RANDOM_PERSONS; i++) {
        
        let person: Person = {
            ...personObjList[i],
            Age: response[i].age
        }

        personsList.push(person);

    }


    return personsList;
}