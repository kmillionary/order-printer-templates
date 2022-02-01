'use strict';

//template container
const opts = document.querySelectorAll('.opt');

//Order Printer templates logo substitution
const btnUrl = document.querySelector('#btnUrl');
const logoUrl = document.querySelector('#logoUrl');
const imgSrc = document.querySelectorAll('.logo-placeholder')
const dummyLogo = 'https://cdn.shopify.com/s/files/1/0482/5815/4657/files/placeholder.png?v=1632376157'

//Color input
let primaryColor = document.querySelector('#primaryColor');
const primaryColorInput = document.querySelector('#primaryColorInput');

//logo width
const logoWidth = document.querySelector('#logoWidth');
const rangeWidth = document.querySelector('#rangeWidth');

//content options
const logo = document.querySelector('#logo');
const businessInfo = document.querySelector('#businessInfo');
const customerInfo = document.querySelector('#customerInfo');
const paymentInfo = document.querySelector('#paymentInfo');
const signature = document.querySelector('#signature');
const notes = document.querySelector('#notes');
const tempTextarea = document.querySelector('#message');

//content containers
const logoPlaceholder = document.querySelectorAll('.logo');
const businessData = document.querySelectorAll('.business-data');
const orderData = document.querySelectorAll('.order-data');
const paymentData = document.querySelectorAll('.payment-data');
const signaturePlaceholder = document.querySelectorAll('.signature-placeholder');
const notesPlaceholders = document.querySelectorAll('.note-placeholder');
const messagePlaceholder = document.querySelectorAll('.message-placeholder')

//Tab component
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach((btn, i) => {
    tabBtns[i].addEventListener('click', () => {
        tabBtns.forEach((btn, i) => {
            tabBtns[i].classList.remove('active');
            tabPanels[i].classList.remove('active');
        })

        tabBtns[i].classList.add('active');
        tabPanels[i].classList.add('active');
    })
})

//updating content
const updateTemplate = function (checkboxId, container) {
    checkboxId.addEventListener('change', () => {
        container.forEach(el => {
            el.style.display = `${checkboxId.checked ? 'block' : 'none'}`
        })
    })
}

updateTemplate(logo, logoPlaceholder)
updateTemplate(businessInfo, businessData)
updateTemplate(customerInfo, orderData)
updateTemplate(paymentInfo, paymentData)
updateTemplate(signature, signaturePlaceholder)
updateTemplate(notes, notesPlaceholders)

tempTextarea.addEventListener('input', () =>{
    messagePlaceholder.forEach(msg => msg.innerText = tempTextarea.value);
})

logoUrl.addEventListener('input', () => {
    imgSrc.forEach(img => img.src = logoUrl.value == '' ? dummyLogo : logoUrl.value )
})

rangeWidth.addEventListener('input', function () {
    logoWidth.innerText = rangeWidth.value + 'px';
    imgSrc.forEach(img => img.style.width = rangeWidth.value + 'px')
})

primaryColor.addEventListener('input', function () {
    primaryColorInput.innerText = primaryColor.value;
    opts.forEach(opt => {
        opt.firstElementChild.innerHTML = "";
        opt.firstElementChild.innerHTML =
            `.opt b{color:${primaryColor.value};}`;
    })
})

//Removing unsupported attributes in liquid templates
const attributeRemover = function (selector, attribute) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        el.removeAttribute(attribute);
    })
}

//Order printer template copy function

const opsCopyBtn = document.querySelectorAll('.ops__copy-btn');
const liquidTemplates = document.querySelectorAll('.opt__liquid');

const copyToClip = function (str) {
    attributeRemover('link', 'wfd-invisible');
    attributeRemover('style', 'wfd-invisible');

    function listener(e) {
        e.clipboardData.setData("text/html", str);
        e.clipboardData.setData("text/plain", str);
        e.preventDefault();
    }

    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);

    Swal.fire({
        icon: "success",
        title: "Código copiado",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
    });
};

opsCopyBtn.forEach((btn, i) => {
    opsCopyBtn[i].addEventListener('click', function () {
        copyToClip(liquidTemplates[i].innerHTML)
    })
})