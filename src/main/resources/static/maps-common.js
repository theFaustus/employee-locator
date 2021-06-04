let colors = {
    userColor : '#6e60de',
    adminColor : '#cb1e44',
    leadColor : '#77878a',

    colorSenior : '#bfcd8e',
    colorMedior : '#cf7b5d',
    colorJunior : '#1be19f',
    colorAdmin : '#798a58',
    colorHR : '#f577ff',
    colorRecruiter : '#a2e84f',
    colorNone : '#fcf337',
}

// let svgMarkerPath = "M7,0C3.13,0,0,3.13,0,7c0,5.25,7,13,7,13s7-7.75,7-13C14,3.13,10.87,0,7,0z";
// let svgMarkerPath = "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z";
 let svgMarkerPath = "M12,2C8.1,2,5,5.1,5,9c0,5.3,7,13,7,13s7-7.8,7-13C19,5.1,15.9,2,12,2z";
// let svgMarkerPath = "M125 410 c-56 -72 -111 -176 -120 -224 -7 -36 11 -83 49 -124 76 -85 223 -67 270 31 28 60 29 88 6 150 -19 51 -122 205 -148 221 -6 3 -32 -21 -57 -54z m110 -175 c35 -34 33 -78 -4 -116 -35 -35 -71 -37 -105 -7 -40 35 -43 78 -11 116 34 41 84 44 120 7z";

function getDefaultSvgMarker(fillColor, strokeColor){
    return {
        path: svgMarkerPath,
        strokeWeight: 4,
        fillColor: fillColor,
        fillOpacity: 0.9,
        scale: 1.7,
        strokeColor: strokeColor,
        anchor: {x : 12, y : 22},
    };
}

function getFillColorByRole(role){
    var fillColor = colors.userColor;
    switch (role) {
        case 'ADMIN':
            fillColor = colors.adminColor;
            break;
        case 'USER':
            fillColor = colors.userColor;
            break;
    }
    return fillColor;
}

function getStrokeColorByJobPosition(job){
    let strokeColor = colors.colorNone;
    switch (job) {
        case 'SENIOR':
            strokeColor = colors.colorSenior;
            break;
        case 'MEDIOR':
            strokeColor = colors.colorMedior;
            break;
        case 'JUNIOR':
            strokeColor = colors.colorJunior;
            break;
        case 'ADMIN':
            strokeColor = colors.colorAdmin;
            break;
        case 'HR':
            strokeColor = colors.colorRecruiter;
            break;
    }
    return strokeColor;
}

function displayMarker(map, address, color, description) {
    var geocoder = new google.maps.Geocoder();
    let encodedAddress = encodeURIComponent(address);
    geocoder.geocode({'address': encodedAddress}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();

            createMarker(map, color, description, longitude, latitude);
        }
    });
}

function displayAreaByPostalCodeCountry(map, postalCode, countryCode, color, description) {
    let encodedPostalCode = encodeURIComponent(postalCode);
    let encodedCountryCode = encodeURIComponent(countryCode);

    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions(
        {
            input: encodedPostalCode,
            types: ['(regions)'],
            componentRestrictions: {country: encodedCountryCode}
        }, function (predictions, status) {

            if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'placeId': predictions[0].place_id}, function (results, status) {

                    if (status == google.maps.GeocoderStatus.OK) {

                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();

                        createBounds(map, results[0].geometry.bounds, color);
                        createMarker(map, color, description, longitude, latitude, 1.7);

                        map.setCenter(new google.maps.LatLng(latitude, longitude));
                    }
                });
            }
        });
}

function displayAreaByPlaceId(map, placeId, color, description) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'placeId': placeId}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();

            createBounds(map, results[0].geometry.bounds, color);
            createMarker(map, color, description, longitude, latitude, 1.9);

            map.setCenter(new google.maps.LatLng(latitude, longitude));
        }
    });

}

function createMarker(map, color, description, longitude, latitude, scale) {

    const svgMarker = {
        path:
        svgMarkerPath,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.9,
        scale: scale,
        strokeColor: 'white',
        anchor: {x: 12, y: 24},
    };

    const marker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        title: "Marker",
        icon: svgMarker
    });

    const infoWindow = new google.maps.InfoWindow({
        content: description,
    });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });

    marker.setMap(map);
}


function createBounds(map, bounds, color) {

    var rectangleOptions = {
        strokeColor: color,
        strokeOpacity: 0.5,
        strokeWeight: 4,
        bounds: bounds
    }

    var rectangle = new google.maps.Rectangle(rectangleOptions);

    rectangle.setMap(map);
}
