const styleSummaries = (function() {

    const setEqualHeights = (left, right) => {
        const l = left.clientHeight;
        const r = right.clientHeight;
        if (l === r) return;
        right.style.height = l > r ? `${l}px` : `${r}px`;
        left.style.height = l > r ? `${l}px` : `${r}px`;
    };

    const setColors = (left, right) => {
        if(!left.classList.contains("notification")) return;
        const leftVal = parseInt(left.dataset.value);
        const rightVal = parseInt(right.dataset.value);
        if (rightVal > leftVal) {
            left.classList.remove("is-primary");
            left.classList.add("is-warning");
        }else {
            right.classList.remove("is-primary");
            right.classList.add("is-warning");
        }
    };

    return (leftSummary, rightSummary) => {
        const leftElements = leftSummary.querySelectorAll("article");
        const rightElements = rightSummary.querySelectorAll("article");
        if(!leftElements.length || !rightElements.length) return;
        leftElements.forEach( (leftEl, i) => {
            const rightEl = rightElements[i];
            setEqualHeights(leftEl, rightEl);
            setColors(leftEl, rightEl);
        });
    };

})();