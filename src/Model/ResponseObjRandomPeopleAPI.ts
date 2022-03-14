export type ResponseObjRandomPeopleAPI = {

    results: [{
        name: {
            "title": string;
            "first": string;
            "last": string;
        };
        location: {
            "city": string;
        };
        dob: {
            "date": string;
        };
        picture: {
            "large": string;
        };
    }];

}
