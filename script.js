let selectedCategory = ""
let initializeView = (data) => {
    let buttonsContainer = document.createElement("div")
        let azkarContainer = document.createElement("div")
        buttonsContainer.classList.add("d-flex", "align-items-center", "flex-wrap", "gap-3", "my-4")
        azkarContainer.classList.add("d-flex", "flex-column", "gap-3")
        let renderAzkar = () => {
            azkarContainer.innerHTML = ""
            data[selectedCategory].forEach(item => {
                let zekrDiv = document.createElement("div")
                zekrDiv.classList.add("card")
                let zekrBody = document.createElement("div")
                zekrBody.classList.add("card-body")
                let zekr = document.createElement("h5")
                zekr.textContent = item.content
                zekrBody.appendChild(zekr)
                let zekrButton = document.createElement("button")
                zekrButton.classList.add("btn", "btn-success")
                if(item.count === 0){
                    zekrButton.classList.add("disabled")
                }
                zekrButton.textContent = item.count
                zekrButton.onclick = () => {
                    item.count--
                    window.localStorage.setItem("azkar", JSON.stringify(data))
                    zekrButton.textContent = item.count
                    if(item.count === 0){
                        zekrButton.classList.add("disabled")
                    }
                }
                zekrBody.appendChild(zekrButton)
                zekrDiv.appendChild(zekrBody)
                azkarContainer.appendChild(zekrDiv)
            })
        }
        Object.keys(data).forEach(key => {
            let category = document.createElement("button")
            category.textContent = key
            category.classList.add("btn", "btn-success")
            category.onclick = () => {
                selectedCategory = key
                buttonsContainer.querySelectorAll("button").forEach(btn => {
                    btn.classList.remove("active")
                })
                category.classList.add("active")
                renderAzkar()
            }
            buttonsContainer.appendChild(category)
        })
        let resetButton = document.createElement("button")
        resetButton.classList.add("btn", "btn-success")
        resetButton.textContent = "إعادة الضبط"
        resetButton.onclick = () => {
            window.localStorage.removeItem("azkar")
            window.location.reload()
        }
        resetButton.style.position = "fixed"
        resetButton.style.bottom = "20px"
        resetButton.style.right = "20px"
        
        document.body.appendChild(buttonsContainer)
        document.body.appendChild(azkarContainer)
        document.body.appendChild(resetButton)
}
window.onload = () => {
    if(window.localStorage.getItem("azkar")){
        initializeView(JSON.parse(window.localStorage.getItem("azkar")))
    }else{
        fetch("adkar.json").then(res => res.json()).then((data) => {
            initializeView(data)
        })
    }
}