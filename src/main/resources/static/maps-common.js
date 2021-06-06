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

function getEmployeesLegend(){
    var legend = document.createElement("div");
    legend.id = "legend";
    legend.style.cssText = "border-radius: 2px; background: white; padding: 3px; margin: 10px; box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px; diplay:none";
    var div = document.createElement("div");
    div.style.cssText = 'display: flex; align-content: center; align-items: center; padding: 10px;'
    div.innerHTML = '<svg height="22" width="26"> <path style="fill: ' + colors.userColor + ';" d="' + svgMarkerPath + '" /></svg><p> User</p>';
    legend.appendChild(div);
    div = document.createElement("div");
    div.style.cssText = 'display: flex; align-content: center; align-items: center; padding: 10px;'
    div.innerHTML = '<svg height="22" width="26"> <path style="fill: ' + colors.adminColor + ';" d="' + svgMarkerPath + '" /></svg><p> Admin</p>';
    legend.appendChild(div);
    div = document.createElement("div");
    div.style.cssText = 'display: flex; align-content: center; align-items: center; padding: 10px;'
    div.innerHTML = '' +
        '<div style="height:90px; width:100%; list-style-type:none">' +
        '<div style="display: flex"><svg style="margin-top: 3px; margin-right: 5px;" height="5" width="20"><rect width="20" height="5" style="fill:' + colors.colorSenior + ';" /></svg><p style="margin: 0"> SENIOR</p></div>' +
        '<div style="display: flex"><svg style="margin-top: 3px; margin-right: 5px;" height="5" width="20"><rect width="20" height="5" style="fill:' + colors.colorMedior + '" /></svg><p style="margin: 0"> MEDIOR</p></div>' +
        '<div style="display: flex"><svg style="margin-top: 3px; margin-right: 5px;" height="5" width="20"><rect width="20" height="5" style="fill:' + colors.colorJunior + '" /></svg><p style="margin: 0"> JUNIOR</p></div>' +
        '<div style="display: flex"><svg style="margin-top: 3px; margin-right: 5px;" height="5" width="20"><rect width="20" height="5" style="fill:' + colors.colorAdmin + '" /></svg><p style="margin: 0"> HR</p></div>' +
        '<div style="display: flex"><svg style="margin-top: 3px; margin-right: 5px;" height="5" width="20"><rect width="20" height="5" style="fill:' + colors.colorRecruiter + '" /></svg><p style="margin: 0"> RECRUITER</p></div>' +
        '<div style="display: flex"><svg style="margin-top: 3px; margin-right: 5px;" height="5" width="20"><rect width="20" height="5" style="fill:' + colors.colorNone + '" /></svg><p style="margin: 0"> NONE</p></div>' +
        '</div>';
    legend.appendChild(div)
    return legend;
}

function getEmployeeDescription(fullName, role, position, address) {
    return '<div style="align-content: center; align-items: center; text-align: center;" id="content">' +
        '<h4>' + fullName + '</h4>' +
        '<div id="bodyContent">' +
        '<p><span style="padding: 3px; border-radius: 3px; font-size: 11.844px; font-weight: bold; line-height: 14px; color: #ffffff; text-shadow: 0 -1px 0 rgb(0 0 0 / 25%); white-space: nowrap; vertical-align: baseline;background-color: ' + getFillColorByRole(role) + '">' + role + '</span> ' +
        '/ <span style="padding: 3px; border-radius: 3px; font-size: 11.844px; font-weight: bold; line-height: 14px; color: #ffffff; text-shadow: 0 -1px 0 rgb(0 0 0 / 25%); white-space: nowrap; vertical-align: baseline;background-color: ' + getStrokeColorByJobPosition(position) + '">' + position + "</span></p>" +
        "<p>" + address + "</p>" +
        "</div>" + "</div>";
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
