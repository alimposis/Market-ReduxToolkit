import { MainPage } from "./pages/mainPage/mainPage"
import { BasketPage } from "./pages/basketPage/basketPage"
import { CategoryPage } from "./pages/categoryPage/categoryPage"
import { ProductsUserPage } from "./pages/prouctsUserPage/productsUserPage"

import { Route,Routes,BrowserRouter } from "react-router-dom"

export function App () {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/Basket" element={<BasketPage/>}/>
        <Route path="/:id" element={<MainPage/>}/>
        <Route path="/category/:categotyId" element={<CategoryPage/>}/>
        <Route path="/:id/productsUser" element={<ProductsUserPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
