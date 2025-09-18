import { Dialog } from "@headlessui/react";
import FlowerImages from "./FlowerImages";
import BuyNowSection from "./BuyNowSection";
import { IoClose } from "react-icons/io5";

const FlowerDialog = ({selectedProduct, setSelectedProduct}) => {
    return (
        <div>
            <Dialog
                    open={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 p-4"
                  >
                    <Dialog.Panel className="bg-white p-6 rounded shadow max-w-5xl w-full overflow-y-scroll max-h-full">
                      <div className="justify-items-end hover:text-pink-500" onClick={() => setSelectedProduct(null)}><IoClose size={30}/></div>
                      {selectedProduct && (
                        <>
                          <Dialog.Title className="text-xl font-bold mb-4">
                            {selectedProduct.name}
                          </Dialog.Title>
            
                          <div className="sm:flex gap-10">
                            <div><FlowerImages images={selectedProduct.images} /></div>
                            <div><BuyNowSection flower={selectedProduct} /> </div>
                          </div>
                        </>
                      )}
                    </Dialog.Panel>
                  </Dialog>
        </div>
    );
};

export default FlowerDialog;