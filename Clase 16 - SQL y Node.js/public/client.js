const socket = io();
const productsList = document.querySelector('#products')
const productForm = document.querySelector("#productForm");
const titleInput = document.querySelector(".titleInput");
const priceInput = document.querySelector(".priceInput");
const thumbnailInput = document.querySelector(".thumbnailInput");

const formMessage = document.querySelector("#formMessage");
const userEmailInput = document.querySelector("#userEmailInput");
const messageInput = document.querySelector("#messageInput");
const messagesPool = document.querySelector("#messagesPool");

function sendProduct() {
  try {
    const title = titleInput.value;
    const price = Number(priceInput.value);
    const thumbnail = thumbnailInput.value;
    socket.emit("client:product", { title, price, thumbnail });
  } catch (err) {
    console.log(`Hubo un error ${err}`);
  }
}

async function renderProducts(products) {
  try {
    const template = await fetch('products.hbs')
    const hbsTemplateCompiled = Handlebars.compile(await template.text())

    productsList.innerHTML = hbsTemplateCompiled({products})
  } 
  catch (error) {
    console.log(`Han error has ocurred: ${error}`)
  }
}

const sendMessage = () => {
  try {
    const email = userEmailInput.value;
    const message = messageInput.value;
    socket.emit("client:message", { email, message });
  } catch (error) {
    console.log(`Han error has ocurred; ${error}`);
  }
};

const renderMessages = async (messages) => {
  try {
    const template = await fetch('chat.hbs')
        const hbsTemplateCompiled = Handlebars.compile(await template.text())
        messagesPool.innerHTML = hbsTemplateCompiled({messages})
      } 
      catch (error) {
      console.log(`Hubo un error ${error}`);
  }
};

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendProduct();
  titleInput.value = "";
  priceInput.value = "";
  thumbnailInput.value = "";
});

formMessage.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage();
  messageInput.value = "";
});

socket.on("server:product", products => {renderProducts(products)});
socket.on("server:message", renderMessages);
