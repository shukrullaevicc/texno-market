import { Button, Layout, Avatar } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { NavLink } from "react-router-dom";

import { useProfileApiQuery } from "../../redux/api/profileApi";
import { Loading } from "../../utils"

const { Header } = Layout;

const HeaderComponent = ({ collapsed, handleToggleCollapsed }) => {
   const { data: profile } = useProfileApiQuery();

   const firstName = profile?.payload.first_name || "User";

   return (
      <Header style={{ padding: 0, display: "flex", alignItems: "center", gap: "20px" }}>
         <Button
            type="text"
            onClick={handleToggleCollapsed}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            style={{ fontSize: "16px", width: 64, height: 64, color: "#fff" }}
         />

         <div style={{ flex: 1, display: "flex", alignItems: "center" }}></div>

         <NavLink to="/dashboard/profile">
            <div className="bg-[#ff5722]">
               <div className="flex items-center text-white gap-[15px] ml-[20px] mr-[20px]">
                  <Avatar size="large" style={{ cursor: "pointer", color: "#f56a00", backgroundColor: "#fde3cf" }}>
                     {
                        profile?.payload.first_name?.charAt(0) || <Loading />
                     }
                  </Avatar>
                  <span>{firstName}</span>
               </div>
            </div>
         </NavLink>
      </Header>
   );
};

export default HeaderComponent;