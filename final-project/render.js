
export const renderHeroCard = function(hero) {
    return (
        `<div data-id="${hero.id}" class="card">
    
            <div style="background-color:${hero.backgroundColor}; padding: 20px; margin-top: 20px; text-align: center; border-radius: 5px 5px 0 0;">
                <img style="border-radius:100%; border:5px solid #F8F8F8;" src=${hero.img} alt="image of superhero">
                <h3 class="title is-3" style="color:${hero.color};">${hero.name}</h3>
            </div>
    
            <div style="color:#4A4A4A; background-color:#F8F8F8; padding:20px; border-radius: 0 0 5px 5px;">
                <p><span style = "font-weight: bold;">Real Name: </span>${hero.first} ${hero.last}</p>
                <p><span style = "font-weight: bold;">First Seen: </span>${hero.firstSeen.toLocaleDateString()}</p>
                <br>
                <p>${hero.description}</p>
                <br>
                <button id="edit-button" class="button is-rounded is-dark">Edit</button>
            </div>
        </div>`);
};




export const renderHeroEditForm = function(hero) {
    let date_obj = hero.firstSeen;
    let date = ("0" + hero.firstSeen.getDate()).slice(-2);
    let month = ("0" + (hero.firstSeen.getMonth() + 1)).slice(-2);
    let first_seen_date = hero.firstSeen.getFullYear()+"-"+(month)+"-"+(date);

    return (
        `<div data-id="${hero.id}" class="card">
        
        <div style="background-color:${hero.backgroundColor}; padding: 20px; margin-top: 20px; text-align: center; border-radius: 5px 5px 0 0;">
            <img style="border-radius:100%; border:5px solid #F8F8F8;" src=${hero.img} alt="image of superhero">
        </div>

        <div style="color:#4A4A4A; background-color:#F8F8F8; padding:20px; border-radius: 0 0 5px 5px;">
            <form>
                <div class="field">
                    <label class="label">Superhero Name</label>
                    <div class="control">
                    <input class="input is-rounded" type="text" name="name" value=${hero.name}>
                    </div>
                </div>
                
                <div class="field">
                    <label class="label">First Name</label>
                    <div class="control">
                    <input class="input is-rounded" type="text" name="first" value=${hero.first}>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Last Name</label>
                    <div class="control">
                    <input class="input is-rounded" type="text" name="last" value=${hero.last}>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Date First Seen</label>
                    <div class="control">
                    <input class="input is-rounded" type="date" name="firstSeen" value=${first_seen_date}>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                    <textarea class="textarea" name="description">${hero.description}</textarea>               
                    </div>
                </div>


                <button id="cancel-button" class="button is-rounded is-danger" type="button">Cancel</button>
                <button id="submit-button" class="button is-rounded is-dark" type="submit">Save</button>
            
            </form>
        </div>
    </div>`

    );
};



export const handleEditButtonPress = function(event) {
    
    const hero_id = $(event.target).closest(".card").data("id");

    let edit_form;

    heroicData.forEach(hero_obj => {
        if (hero_obj.id === hero_id) {
            edit_form = renderHeroEditForm(hero_obj)
        }
    });

    $(event.target).closest(".card").replaceWith(edit_form);
};



export const handleCancelButtonPress = function(event) {

    const hero_id = $(event.target).closest(".card").data("id");

    let hero_card;

    heroicData.forEach(hero_obj => {
        if (hero_obj.id === hero_id) {
            hero_card = renderHeroCard(hero_obj)
        }
    });

    $(event.target).closest(".card").replaceWith(hero_card);
};



export const handleEditFormSubmit = function(event) {

    event.preventDefault();

    const hero_id = $(event.target).closest(".card").data("id");

    //gather form inputs into an array
    let form_inputs = $(event.target).closest("form").serializeArray();    
    
    // in heroicData, replace the old hero values with the input form values and render hero card for the editted hero
    let new_hero_card;

    heroicData.forEach(hero_obj => {
        if (hero_obj.id === hero_id) {
            hero_obj.name = form_inputs[0].value;
            hero_obj.first = form_inputs[1].value;
            hero_obj.last = form_inputs[2].value;
            let input_date_parts=form_inputs[3].value.split('-');
            hero_obj.firstSeen = new Date(input_date_parts[0], input_date_parts[1] - 1, input_date_parts[2]);
            hero_obj.description = form_inputs[4].value;

            new_hero_card=renderHeroCard(hero_obj);
        };
    });

    //replace the edit form in the DOM with the new hero card
    $(event.target).closest(".card").replaceWith(new_hero_card);


};


export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    for (let i=0; i<heroes.length; i++) {
        $root.append(renderHeroCard(heroes[i]));
    };

    $root.on('click', "#edit-button", handleEditButtonPress);

    $root.on('click', "#submit-button", handleEditFormSubmit);

    $root.on('click', "#cancel-button", handleCancelButtonPress);

};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
