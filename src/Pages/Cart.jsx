import { useContext , useState } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Image } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import CheckOutModal from "../Components/Checkout";
import { addDoc, collection, doc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
function Cart() {
  const { cartItems, removeItemFromCart, addItemToCart, lessQuanityFromCart ,clearCart} =
    useContext(CartContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const totalQuantity = cartItems.reduce(
      (value, item) => value + item.quantity,
      0
    );
  
    const totalPrice = cartItems.reduce(
      (value, item) => value + item.quantity * item.price,
      0
    );
  const checkoutOder = async (values) => {
    const checkoutObj = {
      ...values,
      totalPrice,
      totalQuantity,
      status: "pending",
      user: auth.currentUser ? auth.currentUser.uid : "guest",
      items: cartItems.map(
        (data) =>
          `Item : ${data.title} , Price : ${data.price}  (${data.quantity}) `
      ),
    };

    const docRef = collection(db, "orders");
    addDoc(docRef, checkoutObj).then(() =>
      message.success("Your order is placed")
    );

    const encodedTxt = encodeURIComponent(JSON.stringify(checkoutObj));
    console.log("values=>", encodeURIComponent(JSON.stringify(checkoutObj)));
    window.open(`https://wa.me/923122088145?text=${encodedTxt}`);
    clearCart();
    setIsModalOpen(false)
  };

  return (
    <div className="container mx-auto my-5">
       <CheckOutModal
        isModalOpen={isModalOpen}
        handleOk={() => setIsModalOpen(false)}
        handleCancel={() => setIsModalOpen(false)}
        checkoutOrder={checkoutOder}
      />
      <h1 className="font-medium text-3xl underline">Cart Items</h1>

      <div className="flex gap-5 my-5">
        <div className="flex-grow flex flex-col border p-4 justify-center items-center">
          <h1>Total Quantity</h1>
          <h1 className="font-semibold font-mono mt-3 text-3xl">
            {totalQuantity}
          </h1>
        </div>
        <div className="flex-grow flex flex-col border p-4 justify-center items-center">
          <h1>Total Amount</h1>
          <h1 className="font-semibold font-mono mt-3 text-3xl">
            ${Math.round(totalPrice)}
          </h1>
        </div>
        <div    onClick={openModal} className="flex-grow flex flex-col border p-4 justify-center items-center">
          <h1>Checkout</h1>
        </div>
      </div>

      {cartItems.map((data) => (
        <div key={data.id} className="flex items-center border my-2 p-3">
          <Image src={data.thumbnail} height={200} width={250} />

          <div className="flex flex-col pl-5">
            <h1 className="font-medium text-xl mb-2">
              {data.title} {`(${data.category})`}
            </h1>
            <h1 className="font-normal text-lg mb-2">{data.description}</h1>
            <h1 className="font-normal text-lg mb-2">Price : {data.price}</h1>

            <div className="flex gap-3 items-center">
              <Button
                onClick={() => addItemToCart(data)}
                icon={<PlusOutlined />}
              ></Button>

              <h1 className="text-xl">{data.quantity}</h1>
              <Button
                danger
                icon={<MinusOutlined />}
                onClick={() => lessQuanityFromCart(data.id)}
                disabled={data.quantity === 1}
              ></Button>
            </div>

            <Button
              onClick={() => removeItemFromCart(data.id)}
              danger
              className="w-40 my-4"
            >
              Remove item{" "}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
