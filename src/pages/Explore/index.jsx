import React, {
  memo,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import style from "./style.module.scss";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Menu from "components/Menu";
import Swiper from "Swiper";
import { Link, useLocation } from "react-router-dom";
import TransitionSwitch from "../../components/TransitionSwitch";
import { renderRoutes } from "../../routes";
import DrawerContainer from "./DrawerContainer";
import { EXPLORE_PATH, imageFormat } from "../../constant";
import { useThrottle } from "../../utils/userHooks";
import { useSelector, useDispatch } from "react-redux";
import MuseTypeList from "./MuseTypeList";
import { setMuseList } from "../../sotre/muse";
import museData from "utils/museList.json";

function Explore(props) {
  const { routes } = props;
  const { soundList } = useSelector(({ music }) => music);
  const { museList } = useSelector(({ muse }) => muse);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const controls = useAnimation();
  const scrollRef = useRef();
  const opacity = useMotionValue(0);
  const [drawerType, setDrawerType] = useState(null);
  const navBoxData = useMemo(
    () => [
      {
        icon: "sound",
        color: "#2ecc71",
        name: "声音",
        type: "sound",
      },
      {
        icon: "circle",
        color: "#3498db",
        name: "冥想",
        type: "muse",
      },
      {
        icon: "sleep",
        color: "#9b59b6",
        name: "睡眠",
        type: "sleep",
      },
      {
        icon: "vip",
        color: "#f1c40f",
        name: "PLUS",
        type: "plus",
      },
    ],
    []
  );
  const toDay = useMemo(() => {
    const now = new Date().toDateString().split(" ");
    return [now[1].toUpperCase(), now[2]];
  }, []);

  //swiper
  useEffect(() => {
    let swiper;
    if (soundList.length) {
      swiper = InitSwiper(".swiper-container");
    }
    return () => {
      swiper && swiper.destroy(false);
    };
  }, [soundList]);
  //route animate
  useEffect(() => {
    if (!drawerType && pathname === EXPLORE_PATH) {
      controls.start({ x: 0 });
    } else {
      controls.start({ x: "-25%" });
    }
  }, [controls, pathname, drawerType]);

  //museList
  useEffect(() => {
    if (!museList.length) dispatch(setMuseList(museData));
  }, [dispatch, museList]);

  const handleScroll = useThrottle((e) => {
    if (e.target === scrollRef.current) {
      const scrollY = e.target.scrollTop;
      opacity.set(Math.min(1, ~~scrollY / 100));
    }
  });
  const OpenDrawer = useCallback(
    (type) => {
      setDrawerType(type);
      controls.start({ opacity: 1, x: "-25%" });
    },
    [controls]
  );

  const closeDrawer = useCallback(() => {
    setDrawerType(null);
    controls.start({ x: 0 });
  }, [controls]);
  return (
    <>
      <motion.div
        className={style.explore}
        initial={{ opacity: 1 }}
        animate={controls}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.4 }}
      >
        <header>
          <motion.p style={{ opacity }}>探索</motion.p>
        </header>
        <div
          className={style.content_wrap}
          ref={scrollRef}
          onScroll={handleScroll}
        >
          <div className={style.page_info}>
            <p>探索</p>
            <span>带着觉知, 清醒地生活</span>
          </div>
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {soundList.slice(10).map((sound) => (
                <div key={sound.id} className={`swiper-slide`}>
                  <img
                    className={style.banner_item}
                    src={`${sound.cover_url}${imageFormat(400, 400)}`}
                    alt={sound.name["zh-Hans"]}
                  />
                  <span className={style.banner_text}>
                    {sound.name["zh-Hans"]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={style.nav_box}>
            {navBoxData.map(({ icon, color, name, type }) => (
              <div
                key={name}
                className={style.nav_box_item}
                onClick={() => OpenDrawer(type)}
              >
                <i className={`iconfont icon-${icon}`} style={{ color }}></i>
                <p>{name}</p>
              </div>
            ))}
          </div>
          <div className={style.name}>
            <h3>声音</h3>
            <span>更多</span>
          </div>
          <div className={style.sound_list}>
            {soundList.map((sound) => (
              <Link
                to={`/explore/sound/${sound.id}`}
                key={sound.id}
                className={style.sound_list_item}
                style={{ backgroundColor: `rgba(${sound.primary_color})` }}
              >
                <img
                  src={`${sound.cover_url}${imageFormat(100, 100)}`}
                  alt={sound.name["zh-Hans"]}
                />
                <p>{sound.name["zh-Hans"]}</p>
              </Link>
            ))}
          </div>
          <div className={style.name}>
            <h3>轻冥想</h3>
          </div>
          <MuseTypeList
            style={{
              padding: "0 2rem 1rem",
            }}
          />
          <div className={style.sleep_box}>
            <div className={style.name}>
              <h3>睡眠</h3>
              <span>更多</span>
            </div>
            <ul className={style.sleep_list}>
              {soundList.slice(2, 8).map((sound) => (
                <li key={sound.id} className={style.sleep_list_item}>
                  <img
                    src={`${sound.cover_url}${imageFormat(300, 300)}`}
                    alt={sound.name["zh-Hans"]}
                  />
                  <div className={style.infos}>
                    <p>{sound.name["zh-Hans"]}</p>
                    <span>{sound.sub_title["zh-Hans"]}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.name}>
            <h3>冥想</h3>
            <span>更多</span>
          </div>
          <div className={style.muse_list}>
            {soundList.slice(12).map((sound) => (
              <li key={sound.id} className={style.muse_list_item}>
                <img
                  src={`${sound.cover_url}${imageFormat(300, 300)}`}
                  alt={sound.name["zh-Hans"]}
                />
                <div className={style.infos}>
                  <p>{sound.name["zh-Hans"]}</p>
                  <span>{sound.sub_title["zh-Hans"]}</span>
                </div>
              </li>
            ))}
          </div>
          <div className={style.name}>
            <h3 style={{ color: "#ccc" }}>潮汐日帖</h3>
            <span>更多</span>
          </div>
          <div className={style.day_image_wrap}>
            <div className={style.img_container}>
              <img
                src={`${soundList[14]?.cover_url}${imageFormat(500, 500)}`}
                alt=""
              />
              <ul className={style.day_title}>
                <li>潮</li>
                <li>汐</li>
                <li>日</li>
                <li>帖</li>
              </ul>
              <div className={style.day_time}>
                <p className={style.day}>{toDay[1]}</p>
                <p className={style.month}>{toDay[0]}</p>
              </div>
            </div>
            <div className={style.poetry}>
              <p>终日昏昏醉梦间，忽闻春尽强登山。</p>
              <p>因过竹院逢僧话，偷得浮生半日闲。</p>
            </div>
            <p className={style.author}>《题鹤林寺僧舍》, 李涉</p>
            <hr />
          </div>
          <section className={style.article_list}>
            {Array.from(Array(7), (_, i) => (
              <div key={i} className={style.article}>
                <div className={style.title}>
                  <span className={style.title_type}>冥想</span>
                  <p>test</p>
                </div>
                <img
                  src={`${soundList[19]?.cover_url}${imageFormat(100, 100)}`}
                  alt=""
                />
              </div>
            ))}
          </section>
          <footer>和大自然一起平静身心</footer>
        </div>
        <Menu />
      </motion.div>
      <TransitionSwitch renderOne={false}>
        {renderRoutes(routes)}
      </TransitionSwitch>
      <DrawerContainer close={closeDrawer} type={drawerType} />
    </>
  );
}
export default memo(Explore);

function InitSwiper(container) {
  return new Swiper(container, {
    grabCursor: true,
    observer: true,
    observeParents: true,
    autoplay: true,
    loop: true,
  });
}
