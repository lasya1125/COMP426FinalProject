
/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {

    return (
        `<div data-id="${hero.id}" class="card">
    
            <div style="background-color:${hero.backgroundColor}; padding: 20px; margin-top: 20px; text-align: center; border-radius: 5px 5px 0 0;">
                <img class= "profile-pic" style="border-radius:100%; border:5px solid #F8F8F8;" src=${hero.img} alt="image of superhero">
                <h3 class="title is-3" style="color:${hero.color};">${hero.first} ${hero.last}</h3>
            </div>
    
            <div style="color:#4A4A4A; background-color:#F8F8F8; padding:20px; border-radius: 0 0 5px 5px;">
                <p><span style = "font-weight: bold; line-height:30px;">Diet Plan: </span>${hero.dietPlan}</p>
                
                <p><span style = "font-weight: bold; line-height:30px;">Height: </span>${hero.height}</p>
                
                <p><span style = "font-weight: bold; line-height:30px;">Weight: </span>${hero.weight}</p>
                <br>
                <button id="edit-button" class="button is-rounded is-dark">Edit</button>
            </div>
        </div>`);
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {

    return (
        `<div data-id="${hero.id}" class="card">
        
        <div style="background-color:${hero.backgroundColor}; padding: 20px; margin-top: 20px; text-align: center; border-radius: 5px 5px 0 0;">
            <img style="border-radius:100%; border:5px solid #F8F8F8;" src=${hero.img} alt="image of superhero">
        </div>

        <div style="color:#4A4A4A; background-color:#28B234; padding:20px; border-radius: 0 0 5px 5px;">
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


                <div class="field">
                    <label class="label">Diet Plan</label>
                    <div class="control">
                        <div class="select is-rounded">
                            <select name="dietPlan">
                                <option value=${hero.dietPlan} selected disabled hidden>Selected: ${hero.dietPlan}</option>
                                <option value="Balanced">Balanced</option>
                                <option value="High-Fiber">High-Fiber</option>
                                <option value="High-Protein">High-Protein</option>
                                <option value="Low-Carb">Low-Carb</option>
                                <option value="Low-Fat">Low-Fat</option>
                                <option value="Low-Sodium">Low-Sodium</option>
                            </select>
                        </div>
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


                <button id="cancel-button" class="button is-rounded is-danger" type="button">Cancel</button>
                <button id="submit-button" class="button is-rounded is-dark" type="submit">Save</button>
            
            </form>
        </div>
    </div>`

    );
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    
    const hero_id = $(event.target).closest(".card").data("id");

    let edit_form;

    heroicData.forEach(hero_obj => {
        if (hero_obj.id === hero_id) {
            edit_form = renderHeroEditForm(hero_obj)
        }
    });

    $(event.target).closest(".card").replaceWith(edit_form);
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    const hero_id = $(event.target).closest(".card").data("id");

    let hero_card;

    heroicData.forEach(hero_obj => {
        if (hero_obj.id === hero_id) {
            hero_card = renderHeroCard(hero_obj)
        }
    });

    $(event.target).closest(".card").replaceWith(hero_card);
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead

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

            new_hero_card=renderHeroCard(hero_obj);
        };
    });

    //replace the edit form in the DOM with the new hero card
    $(event.target).closest(".card").replaceWith(new_hero_card);


};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    for (let i=0; i<heroes.length; i++) {
        $root.append(renderHeroCard(heroes[i]));
    };

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button

    $root.on('click', "#edit-button", handleEditButtonPress);

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $root.on('click', "#submit-button", handleEditFormSubmit);

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $root.on('click', "#cancel-button", handleCancelButtonPress);

};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
