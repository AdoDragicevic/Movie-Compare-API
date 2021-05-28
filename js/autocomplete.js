const renderAutoComplete = ( { root, fetchIndex, renderOption, onOptionSelect, setInputValue } ) => {

    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input">
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

    
    const input = root.querySelector("input");
    const dropdown = root.querySelector(".dropdown");
    const dropdownContent = root.querySelector(".dropdown-content");
    
    
    const listOptions = results => {
        for (let result of results) {
            const option = document.createElement("a");
            option.classList.add("dropdown-item");
            option.innerHTML = renderOption(result);
            dropdownContent.appendChild(option);
            option.addEventListener( "click", () => {
                dropdown.classList.remove("is-active");
                input.value = setInputValue(result);
                onOptionSelect(result);
            });
        }
    };

  
    const onInput = async event => {
        let result = await fetchIndex(event.target.value);
        if (!result.length) {
            dropdown.classList.remove("is-active");
            return;
        } else {
            dropdown.classList.add("is-active");
            dropdownContent.innerHTML = "";
            listOptions(result);
        }
    };

  
    const debounce = (func, delay = 1000) => {
        let timeoutId;
        return (...args) => {
            if(timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout( () => {
                func.apply(null, args);
            }, delay);
        };
    };

    
    input.addEventListener("input", debounce(onInput, 500));


    document.addEventListener("click", event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove("is-active");
        }
    }); 

};