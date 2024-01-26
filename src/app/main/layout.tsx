"use client";

import Footer from "@/components/footer/footer";
import InnerHeaderTitle from "@/components/inner-header-title/inner-header-title";
import Header from "@/components/header/header";
import SideMenu from "@/components/side-menu/side-menu";
import { useEffect } from "react";
import { debounce } from "lodash";
import {
  selectClientSize,
  setWindowSize,
  useDispatch,
  useSelector,
} from "@/lib/redux";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    clientWidth,
    clientHeight,
    headerHeighht,
    footerHeight,
    sideMenuWidth,
    innerHeaderHeight,
  } = useSelector(selectClientSize);

  const dispatch = useDispatch();

  useEffect(() => {
    const setSize = (flg: boolean) => {
      dispatch(
        setWindowSize({
          clientHeight: window.innerHeight,
          clientWidth: window.innerWidth,
        })
      );
      // this.setWindowWidth(window.innerWidth);
      // if (this.$refs.main) {
      //   this.setInnerHeight(this.$refs.main.clientHeight);
      //   this.setInnerWidth(this.$refs.main.clientWidth);
      // if (flg) {
      // if (window.innerWidth < 1300) {
      //   this.collapsed = true;
      // } else {
      //   this.collapsed = false;
      // }
      // }
      // }
    };

    window.onresize = debounce(() => {
      setSize(true);
    }, 100);
    setSize(true);
  }, [dispatch]);

  return (
    <section>
        <Header></Header>
        <div style={{ display: "flex" }}>
          <SideMenu></SideMenu>
          <div
            style={{
              width: `${clientWidth - sideMenuWidth}px`,
              height: `${clientHeight - headerHeighht}px`,
            }}
          >
            <InnerHeaderTitle />
            <div
              style={{
                width: `${clientWidth - sideMenuWidth}px`,
                height: `${
                  clientHeight -
                  headerHeighht -
                  footerHeight -
                  innerHeaderHeight
                }px`,
                overflow: "auto",
              }}
            >
              {children}
            </div>
            <Footer />
          </div>
        </div>
    </section>
  );
}
