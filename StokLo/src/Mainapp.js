
import React, { useEffect, useRef, useState } from "react";

import AppContainer from "./AppContainer";
import { Provider,useDispatch } from "react-redux";
import { Mystore } from "./newredux/Mystore";
export default function Mainapp () {
return(

<Provider store={Mystore}>

<AppContainer/>
</Provider>

)



}