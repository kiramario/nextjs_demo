"use client"
import * as React from "react"
import inter from "@/_libs/Inter"
import { IoLocationOutline } from "react-icons/io5"
import { PiRssSimpleLight } from "react-icons/pi"
import { FaHeart } from "react-icons/fa";
import { CgLink } from "react-icons/cg";
import { IconContext } from "react-icons";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import styles from "@/app/demo/ui/ui.module.css"
import { PiSuitcase } from "react-icons/pi";
import { AIMockInterviewIcon, ChangeJobReferenceSvg } from "@/_components/ui/jobnova_svg"
import { IoEye } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GoArrowLeft } from "react-icons/go";
import { BsArrowUpRight } from "react-icons/bs";

export default function Page() {
    const canvasRef: React.RefObject<HTMLCanvasElement| null> = React.useRef(null);
    const [percent, setpercent] = React.useState(0)

    const [passType, setPassType] = React.useState("password")

    const toggle_passtype = () => {
        if (passType == "password") {
            setPassType("text")
        } else {
            setPassType("password")
        }
    }

    const arc_progress_sl = 110
    const progress_percent = 64

    React.useEffect(() => {
        
        if (
            navigator.userAgent.match(/Mobi/i) ||
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/iPhone/i)
        ) {
            alert("mobile")
        }

        const canvas = canvasRef.current;
        const ctx = canvas ? canvas.getContext('2d') : null;

        if (ctx) {
            ctx.beginPath()
            ctx.arc(arc_progress_sl/2, arc_progress_sl/2, arc_progress_sl/2, 0, (progress_percent/100)*2*Math.PI, false);
            ctx.strokeStyle = '#ffd035';
            ctx.lineWidth = 10;
            ctx.stroke();

            ctx.beginPath()
            ctx.arc(arc_progress_sl/2, arc_progress_sl/2, arc_progress_sl/2, 0, (progress_percent/100)*2*Math.PI, true);
            ctx.strokeStyle = '#f3f3f4';
            ctx.lineWidth = 10;
            ctx.stroke();
        }
    
    }, [])

    return (
        <>
            <h1 className="text-center text-xl font-bold">app/demo/ui page</h1>

            <div className={`w-full mg-auto bg-[#dbdada] px-10 py-20 ${inter.className} flex justify-start flex-wrap`}>
                <div className="reative w-[110px] h-[110px] flex flex-col items-center justify-center bg-[#fff]">
                    <canvas ref={canvasRef} width={arc_progress_sl} height={arc_progress_sl} className="border border-1 absolute bg-transparent"/>
                    <span className="inline-block text-[24px] font-bold">{progress_percent}%</span>
                    <span className="inline-block text-[18px]">Match</span>
                </div>
                
                <div className="bg-[#fff] ml-5 w-[870px] flex flex-col justify-between py-[18px]">
                    <p className="flex justify-between">
                        <span className="block text-[25px] text-[#000]">
                            Full-Stack Software Engineer(Web Developer)
                        </span>
                        <span className="block">
                            <CgLink className="inline-block w-[20px] h-[20px] text-[#1F2937] mr-[15px]"/>

                            <IconContext.Provider value={{ attr: {fill: "#A68BFA", stroke: ""} }}>
                                <FaHeart className="inline-block w-[20px] h-[20px]"/>
                            </IconContext.Provider>
                        </span>
                    </p>

                    <p className="text-[16px] text-[#A9A9A9]">
                        <img src="/images/google_icon.svg" className="inline-block w-[22px] h-[22px]"/> Google Inc.
                    </p>
                    
                    <span className="inline-block text-[14px] text-[#1F2937]">
                        <IoLocationOutline className="inline-block w-[14px] h-[14px] text-[#1F2937]"/> Austin, Texas Metropolitan Area
                        <span className="inline-block bg-[#734AE2] w-[7px] h-[7px] rounded-full mx-[13px]"></span>
                        <PiRssSimpleLight className="inline-block w-[17px] h-[17px] text-[#1F2937]"/> On-site
                    </span>
                </div>

                <div className="ml-2 bg-[#fbeaea] px-3 py-3">
                    <span className="bg-[#fff] text-[#1F2937] text-[14px] border border-1 rounded-xl border-[#E8E8E8] py-[4px] px-[15px] mr-[5px]">$90K/yr - $130K/yr</span>
                    <span className="bg-[#fff] text-[#1F2937] text-[14px] border border-1 rounded-xl border-[#E8E8E8] py-[4px] px-[15px] mr-[5px]">5+ years exp</span>
                    <span className="bg-[#734ae20c] text-[#1F2937] text-[14px] border border-1 rounded-xl border-[#E8E8E8] py-[4px] px-[15px] mr-[5px]">2 hours ago</span>
                </div>

                <div className="ml-2 bg-[#fadaea] px-3 py-3">
                    <div className="relative w-fit">
                        <select defaultValue={"cac"} className="cursor-pointer w-[225px] py-[9px] px-[16px] bg-[#EAEAEA] text-[#B1AEAE] text-[14px] rounded-2xl block appearance-none focus:outline-0 focus:ring-2">
                            <option value="cac">Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                        </select>
                        <IoIosArrowDown className="absolute top-[50%] -translate-y-1/2 right-[16px] stroke-[#717171]"/>
                    </div>
                    <span className="inline-block bg-[#A68BFA] py-[8px] px-[16px] text-[14px] text-[#fff] rounded-3xl">
                        <IoMdAdd className="inline-block mr-[4px] stroke-[#fff] w-[20px] h-[20px]" />
                        Add
                    </span>

                    <ul className="items-center bg-white py-5 px-2">
                        <li className="inline-block border border-1 border-[#EAEAEA] rounded-3xl py-[10px] px-[20px] mr-[12px]">
                            <div className="flex items-center">
                                <input id="check1" type="checkbox" value="" className={`${styles.check_input} w-[16px] h-[16px] mr-[10px] rounded-sm appearance-none checked:bg-[#B7FD33] focus-visible:outline-0 focus:outline-0`} />
                                <label htmlFor="check1" className="text-[14px] font-medium text-[#4D4D4D]">Intern/New Grad</label>
                            </div>
                        </li>
                        <li className="inline-block border border-1 border-[#EAEAEA] rounded-3xl py-[10px] px-[20px] mr-[12px]">
                            <div className="flex items-center">
                            <input id="check2" type="checkbox" value="" className={`${styles.check_input} w-[16px] h-[16px] mr-[10px] rounded-sm appearance-none checked:bg-[#B7FD33] focus-visible:outline-0 focus:outline-0`} />
                            <label htmlFor="check2" className="text-[14px] font-medium text-[#4D4D4D]">Director/Executive</label>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="ml-2 bg-[#fad5ea] px-3 py-3">

                    <span className="inline-block bg-[#19202B] px-[46px] py-[12px] rounded-3xl text-[#fff]">
                        <img src="/images/mock_interview_icon.png" className="mr-[10px] inline-block"/>
                        Mock Interview
                    </span>

                    <div>
                        <span className="flex justify-center items-center align-center block w-[143px] h-[143px] rounded-full bg-[#F8F8F8] mx-auto">
                            <img src="/images/upload_resume.svg" className="w-[60px] h-[64px]" />
                        </span>
                        <span className="block text-[#282828] text-[23px] mt-[40px] text-center">
                            202411_Chel Kno_CV.pdf
                        </span>

                        <span className="bg-[#B7FD33] inline-block text-[16px] py-[12px] px-[18px] mx-auto rounded-3xl">
                            Upload new resume
                        </span>

                    </div>

                    <span className="block w-[200px] py-[12px] pl-[14px] text-[16px] text-[#1D2633] bg-[#fff] rounded-3xl mb-[10px]">
                        <PiSuitcase className="mr-[10px] w-[22px] h-[22px] inline-block"/> Jobs
                    </span>

                    
                    <span className="block w-[200px] py-[12px] pl-[14px] text-[16px] text-[#FFFFFF] bg-[#A68BFA] rounded-3xl mb-[10px]">
                        <span className="mr-[10px] w-[22px] h-[22px] inline-block align-middle" >
                            <AIMockInterviewIcon />
                        </span>
                         AI Mock Interview
                    </span>
                </div>

                <div className="ml-2 bg-[#4ad5ea] px-3 py-3">
                    <div className="">
                        <label htmlFor="password" className="block mb-2 text-[16px] text-[#333333]">Password</label>

                        <span className="relative inline-block">
                            <input type={passType} id="password"
                                className="w-[315px] bg-[#F8F8F9] border border-[#EAEAEA] text-[#B1AEAE] text-[14px] rounded-3xl focus-visible:outline-1 block py-[12px] px-[11px]"
                                placeholder="Enter password" required />

                            <IconContext.Provider value={{ attr: {color: "#4D4D4D"} }}>
                                <IoEye onClick={toggle_passtype} className="w-[14px] h-[14px] absolute right-[14px] top-1/2 -translate-y-1/2 cursor-pointer"/>
                            </IconContext.Provider>
                        </span>
                    </div>
                </div>

                <div className="ml-2 bg-[#e2d5ea] px-3 py-3">
                    <div className="bg-[#ffffff]">
                        <span className="inline-block text-[16px] text-[#19212C] py-[11px] px-[26px] border-2 border-[#A68BFA] rounded-3xl">
                            Matched
                        </span>
                        <div className="inline-block">
                            <div className="h-[43px] w-[146px] border-r border-r-[#DFDFDF] flex justify-center items-center">
                                <span className="inline-block text-[#1B232F99] text-[16px] mr-[10px] align-text-bottom">Liked</span>
                                <span className="relative inline-block w-[18px] h-[18px] rounded-full bg-[#B7FD33] 
                                    after:block after:content-['1'] after:text-[#14px] after:text-[#171E29] after:absolute after:top-[-1px] after:left-[5px]">
                                </span>
                            </div>
                        </div>
                        
                        <div className="inline-block">
                            <div className="h-[43px] w-[146px] border-r border-r-[#DFDFDF] flex justify-center items-center">
                                <span className="inline-block text-[#1B232F99] text-[16px] mr-[10px] align-text-bottom">Applied</span>
                                <span className="relative inline-block w-[18px] h-[18px] rounded-full bg-[#B7FD33] 
                                    after:block after:content-['1'] after:text-[#14px] after:text-[#171E29] after:absolute after:top-[-1px] after:left-[5px]">
                                </span>
                            </div>
                        </div>

                        
                    </div>

                    <div>
                        <span className="inline-block w-[700px] py-[10px]  text-[16px] text-[#FFFFFF] bg-[#A68BFA] rounded-3xl text-center cursor-pointer select-none mr-[10px]">
                            <span className="mr-[10px] w-[13px] h-[18px] inline-block align-middle" >
                                <ChangeJobReferenceSvg />
                            </span>
                            Change Job Reference
                        </span>

                        <div className="inline-block relative w-fit">
                            <select defaultValue={"tm"} className="cursor-pointer w-[182px] py-[9px] px-[19px] bg-[#FFFFFF] text-[#1F2937] text-[16px] rounded-3xl inline-block appearance-none focus:outline-0 focus:ring-2 focus:ring-[#FFFFFF]">
                                <option value="tm">Top matched</option>
                                <option value="US">Most recently</option>
                            </select>
                            <IoIosArrowDown className="absolute top-[50%] -translate-y-1/2 right-[24px] stroke-[red]"/>
                        </div>
                    </div>

                    <div className="mt-[10px]">
                        <span className="inline-block w-full rounded-lg bg-[#ffffff] h-[10px]">
                            <span className="inline-block w-[64%] rounded-lg bg-[#A68BFA] align-top h-[10px]"></span>
                        </span>
                    </div>
                    
                    <div className="mt-[10px]">
                        <span className="inline-block bg-[#000000] select-none  py-[13px] px-[20px] text-[16px] text-[#fff] rounded-3xl">
                            <RiLogoutBoxRLine className="inline-block mr-[10px] stroke-[#fff] w-[16px] h-[16px]" />
                            Log out
                        </span>
                        
                        <span className="inline-block bg-[#FFFFFF] py-[8px] px-[16px] text-[16px] select-none cursor-pointer rounded-3xl">
                            <GoArrowLeft className="inline-block stroke-[#1F2937] w-[24px] cursor-pointer h-[24px]" />
                        </span>

                        <span className="inline-block bg-[#b7fd33] py-[13px] px-[26px] text-[16px] select-none cursor-pointer rounded-3xl">
                            Continue
                        </span>

                        <span className="inline-block bg-[#000000] select-none  py-[10px] px-[18px] text-[16px] text-[#fff] rounded-3xl">
                            Apply Now
                            <BsArrowUpRight className="inline-block ml-[10px] stroke-[#fff] w-[16px] h-[16px]" />
                        </span>
                        
                    </div>

                    <div className="mt-[10px]">
                        <div className="flex">
                            <img src="/images/google_icon.svg" className="w-[90px] h-[90px]"/>
                            <div>
                                <span>2 hours ago</span>
                                <span>UX Designer</span>
                                <span>Company name</span>
                                
                                <div>
                                    <span className="inline-block text-[14px] text-[#1F2937]">
                                        <IoLocationOutline className="inline-block w-[14px] h-[14px] text-[#1F2937]"/> Austin, Texas Metropolitan Area
                                        <span className="inline-block bg-[#734AE2] w-[7px] h-[7px] rounded-full mx-[13px]"></span>
                                        <span>3 days ago</span>
                                        <span className="inline-block bg-[#734AE2] w-[7px] h-[7px] rounded-full mx-[13px]"></span>
                                        <PiRssSimpleLight className="inline-block w-[17px] h-[17px] text-[#1F2937]"/> On-site
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

