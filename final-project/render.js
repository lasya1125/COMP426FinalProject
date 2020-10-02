
export const renderHeroCard = function(hero) {
    return (
        `<div data-id="${hero.id}" class="card">
    
            <div style="background-color:${hero.backgroundColor}; padding: 20px; margin-top: 20px; text-align: center; border-radius: 5px 5px 0 0;">
                <img style="border-radius:100%; border:5px solid #F8F8F8;" src=${hero.img} width = 150 alt="image of superhero">
                <h3 class="title is-3" style="color:${hero.color};">${hero.first} ${hero.last}</h3>
            </div>
    
            <div style="color:#4A4A4A; background-color:#F8F8F8; padding:20px; border-radius: 0 0 5px 5px;">
                <p><span style = "font-weight: bold;">Diet Plan: </span>${hero.dietPlan}</p>
                <br>
                <p><span style = "font-weight: bold;">Height: </span>${hero.height}</p>
                <br>
                <p><span style = "font-weight: bold;">Weight: </span>${hero.weight}</p>
                <br>
                <button id="edit-button" class="button is-rounded is-dark">Edit</button>
            </div>
        </div>`);
};




export const renderHeroEditForm = function(hero) {


    return (
        `<div data-id="${hero.id}" class="card">
        
        <div style="background-color:${hero.backgroundColor}; padding: 20px; margin-top: 20px; text-align: center; border-radius: 5px 5px 0 0;">
            <img style="border-radius:100%; border:5px solid #F8F8F8;" src=${hero.img} width = 150 alt="image of superhero">
        </div>

        <div style="color:#4A4A4A; background-color:#F8F8F8; padding:20px; border-radius: 0 0 5px 5px;">
            <form>
                
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

                <div class="control">
                    <label class="label">Diet Plan</label>
                    <div class="select is-rounded">
                        <select>
                        <option value="balanced">Balanced</option>
                        <option value="high-fiber">High-Fiber</option>
                        <option value="high-protein">High-Protein</option>
                        <option value="low-carb">Low-Carb</option>
                        <option value="low-fat">Low-Fat</option>
                        <option value="low-sodium">Low-Sodium</option>
                        </select>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Height</label>
                    <div class="control">
                    <input class="input is-rounded" type="text" name="height" value=${hero.height}>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Weight</label>
                    <div class="control">
                    <input class="input is-rounded" type="text" name="weight" value=${hero.weight}>
                    </div>
                </div>

                <div class="field">
                    <label class="label">BMI</label>
                    <div class="control">
                    <input class="input is-rounded" type="text" name="bmi" value=${hero.bmi}>
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
            hero_obj.first = form_inputs[0].value;
            hero_obj.last = form_inputs[1].value;
            hero_obj.dietPlan = form_inputs[2].value;
            hero_obj.height = form_inputs[3].value;
            hero_obj.weight = form_inputs[4].value;
            hero_obj.bmi = form_inputs[5].value;

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
