import { motion } from "framer-motion"

const MotionWrap = (Component: any, classNames?: string) => function HOC() {
    return(
        <motion.div
            whileInView={{y:[100, 50, 0], opacity: [0 , 0 , 1]}}
            transition={{duration: .5}}
            className={`app__flex ${classNames}`}
        >
            <Component />
        </motion.div>
    )
}

export default MotionWrap