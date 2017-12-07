"use strict";

app.service("PhotoService", function ($http, $q, FIREBASE_CONFIG) {

const getMyPhotos = (userId) => {
		let myPhotos = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/photos.json?orderBy="uId"&equalTo="${userId}"`).then((results) => {
				let photos = results.data;
				Object.keys(photos).forEach((key) => {
					photos[key].id = key;
					myPhotos.push(photos[key]);
				});
				resolve(myPhotos);
			}).catch((error) => {
				reject(error);
			});
		});
	};

const postNewPhoto = (newPhoto) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/photos.json`, JSON.stringify(newPhoto));
    };


const createImageDetails = (photo, uId) => {
		return {
			"name": photo.name,
            "img_path": photo.img_path,
            "details": photo.details,
            "city": photo.city,
            "uId": uId
		};
	};

	const deletePhoto = (id) => {
        return $http.delete(`${FIREBASE_CONFIG.databaseURL}/photos/${id}.json`);
    };

    const getSinglePhoto = (photoId) => {
    return $http.get(`${FIREBASE_CONFIG.databaseURL}/photos/${photoId}.json`);
};


const editPhoto = (photo, Id) => {
    return $http.put(`${FIREBASE_CONFIG.databaseURL}/photos/${Id}.json`, JSON.stringify(photo));
};




	return {getMyPhotos, createImageDetails, postNewPhoto, deletePhoto, getSinglePhoto, editPhoto};

	});