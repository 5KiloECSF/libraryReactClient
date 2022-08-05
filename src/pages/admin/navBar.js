import React from "react";
import {
    SearchOutlined,BarsOutlined,MessageOutlined, BellOutlined
} from '@ant-design/icons';


export function NavBar({setHidden}) {
    return <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>

            <button onClick={()=>setHidden()} className="w-12 h-16 -mr-2 border-r lg:hidden">
                <BarsOutlined />
            </button>

            <div className="flex space-x-4">
                {/*   -------     search bar -->*/}
                <div className="block">
                    <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                        <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                        <SearchOutlined />
                        </span>
                        <input type="search" name="leadingIcon" id="leadingIcon" placeholder="Search here"
                               className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"/>
                    </div>
                </div>

                {/*chat button*/}
                <button aria-label="chat"
                        className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                    <MessageOutlined />
                </button>
                {/*notification button*/}
                <button aria-label="notification"
                        className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                    <BellOutlined />
                </button>
            </div>
        </div>
    </div>;
}



