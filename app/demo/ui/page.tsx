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
import { AIMockInterviewIcon, ChangeJobReferenceSvg, AddrLocationSvg, InternishpIcon, 
    RemoteIcon, YearsExpIcon, KyrIcon, MidLevelIcon, MaxInterSucIcon, CalendarIcon, UpperbodyIcon,
    WorldBallIcon, CompanyXIcon, CompanyInIcon
 } from "@/_components/ui/jobnova_svg"
import { IoEye } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GoArrowLeft } from "react-icons/go";
import { BsArrowUpRight } from "react-icons/bs";
import ProcessCircle from "@/_components/ui/ProcessCircle"

export default function Page() {
    const [passType, setPassType] = React.useState("password")
    

    const toggle_passtype = () => {
        if (passType == "password") {
            setPassType("text")
        } else {
            setPassType("password")
        }
    }
    React.useEffect(() => {
        
        if (
            navigator.userAgent.match(/Mobi/i) ||
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/iPhone/i)
        ) {
            alert("mobile")
        }


    }, [])

    return (
        <>
            <h1 className="text-center text-xl font-bold">app/demo/ui page</h1>

            <div className={`w-full mg-auto bg-[#dbdada] px-10 py-20 ${inter.className} flex justify-start flex-wrap`}>

                <ProcessCircle text_center_size={24} stroke_color={"#ffd035"} line_width={10} radius={55} progress_percent={64} text_center={"Match"} />

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

                    <span className="inline-block bg-[#19202B] px-[46px] py-[12px] rounded-3xl text-[#fff] select-none">
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
                    
                    <div className="bg-[#fff] px-[18px] py-[21px] rounded-xl w-[385px]">
                        <div className="flex items-center">
                            <div className="border border-[#D7D7D7] rounded-xl p-[13px]  mr-[24px]">
                                <img src="/images/google_icon.svg" className="w-[90px] h-[90px]"/>
                            </div>
                            
                            <div className="">
                                <span className="block w-fit rounded-3xl text-[#5C5C5C] text-[12px] py-[2px] mb-[4px]">22:34 08 MAY, 2024</span>
                                <span className="block text-[18px] mb-[4px]">UX Designer</span>
                                <span className="block text-[14px] font-medium text-[#A9A9A9] mb-[4px]">Google Inc.</span>
                                
                                <div>
                                    <span className="inline-block text-[14px] px-[12px] py-[4px] bg-[#F5F5FA] rounded-xl mr-[7px]">Full time</span>
                                    <span className="inline-block text-[14px] px-[12px] py-[4px] bg-[#F5F5FA] rounded-xl">Intership</span>
                                </div>
                            </div>
                        </div>
                        <span className="my-[16px] block w-full h-[1px] bg-[#4B4B4B3B]"></span>
                        <div className="flex justify-between mt-[12px]">
                            <ProcessCircle text_center_size={16} stroke_color={"#9EEA78"} line_width={2} radius={20} progress_percent={90} 
                            text_center={""} percent_format={(a: number) => a + "" }/>
                            <span className="inline-block text-[16px] bg-[#19202B] px-[18px] py-[10px] rounded-3xl text-[#fff] select-none">
                                Mock Interview
                            </span>

                        </div>

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
                        <span className="inline-block bg-[#000000] select-none  py-[13px] px-[20px] text-[16px] text-[#fff] rounded-3xl pointer-cursor">
                            <RiLogoutBoxRLine className="inline-block mr-[10px] stroke-[#fff] w-[16px] h-[16px]" />
                            Log out
                        </span>
                        
                        <span className="inline-block bg-[#FFFFFF] py-[8px] px-[16px] text-[16px] select-none cursor-pointer rounded-3xl">
                            <GoArrowLeft className="inline-block stroke-[#1F2937] w-[24px] cursor-pointer h-[24px]" />
                        </span>

                        <span className="inline-block bg-[#b7fd33] py-[13px] px-[26px] text-[16px] select-none cursor-pointer rounded-3xl">
                            Continue
                        </span>

                        <span className="inline-block bg-[#000000] select-none  py-[10px] px-[18px] text-[16px] text-[#fff] rounded-3xl pointer-cursor">
                            Apply Now
                            <BsArrowUpRight className="inline-block ml-[10px] stroke-[#fff] w-[16px] h-[16px]" />
                        </span>
                        
                    </div>

                    <div className="mt-[10px] max-w-[800px]">
                        <div className="flex items-center justify-between mb-[7px]">
                            <div className="flex items-center">
                                <img src="/images/google_icon.svg" className="w-[90px] h-[90px] mr-[24px]"/>
                                <div className="">
                                    <span className="block w-fit rounded-3xl text-[#1F2937] text-[14px] px-[13px] py-[2px] bg-[#734AE21F]">2 hours ago</span>
                                    <span className="block text-[23px]">UX Designer</span>
                                    <span className="block text-[16px] text-[#A9A9A9]">Company name</span>
                                    
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
                            
                            <ProcessCircle text_center_size={24}  stroke_color={"#B9FD33"} line_width={10} radius={55} progress_percent={64} text_center={"Match"}/>
                        </div>
                        <div className="grid grid-cols-3 mb-[23px]">
                            <div className="mb-[6px]">
                                <span className="inline-block align-middle mr-[6px]">
                                    <AddrLocationSvg />
                                </span>
                                <span className="text-[#717171] text-[14px]">United States</span>
                            </div>

                            <div className="mb-[6px]">
                                <span className="inline-block align-middle mr-[6px]">
                                    <InternishpIcon />
                                </span>
                                <span className="text-[#717171] text-[14px]">Internship</span>
                            </div>

                            <div className="mb-[6px]">
                                <span className="inline-block align-middle mr-[6px]">
                                    <RemoteIcon />
                                </span>
                                <span className="text-[#717171] text-[14px]">Remote</span>
                            </div>

                            <div className="mb-[6px]">
                                <span className="inline-block align-middle mr-[6px]">
                                    <YearsExpIcon />
                                </span>
                                <span className="text-[#717171] text-[14px]">5+ years exp</span>
                            </div>

                            <div className="mb-[6px]">
                                <span className="inline-block align-middle mr-[6px]">
                                    <KyrIcon />
                                </span>
                                <span className="text-[#717171] text-[14px]">$90K/yr - $130K/yr</span>
                            </div>

                            <div className="mb-[6px]">
                                <span className="inline-block align-middle mr-[6px]">
                                    <MidLevelIcon />
                                </span>
                                <span className="text-[#717171] text-[14px]">Mid Level</span>
                            </div>
                        </div>
                        <div className="text-[14px]">
                            Job description Job description Job description Job description Job description Job description Job description Job description Job description Job description Job description Job description Job description Job description Job description Job description 
                        </div>
                        <div className="bg-[#89FD33] rounded-2xl px-[26px] overflow-hidden pb-[24px] mt-[40px]">
                            <div className="flex items-center py-[24px] broder border-b-1 border-b-[#0E10113D]">
                                <MaxInterSucIcon />
                                <div className="ml-[23px]">
                                    <span className="block text-[18px]">Maximize your interview success</span>
                                    <span className="block text-[#0E101199] text-[14px]">Our platform simulates real interview scenarios, helping you refine your responses and boost your confidence.</span>
                                </div>
                            </div>
                            <div className="flex justify-between mt-[15px]">
                                <div>
                                    <span className="block text-[#1F2937] text-[16px] mb-[8px]">Job-Specific Simulations</span>
                                    <span className="block text-[#0E101199] text-[14px]">Practice with questions tailored to your target role, ensuring relevance and preparation.</span>
                                </div>
                                <div>
                                    <span className="block text-[#1F2937] text-[16px] mb-[8px]">Actionable Feedback</span>
                                    <span className="block text-[#0E101199] text-[14px]">Get detailed analysis of your responses and practical, step-by-step improvement suggestions</span>
                                </div>
                                <div>
                                    <span className="block text-[#1F2937] text-[16px] mb-[8px]">Boost Success Rates</span>
                                    <span className="block text-[#0E101199] text-[14px]">Perfect your interview skills and increase your chances of landing the job you want.</span>
                                </div>
                            </div>

                            <span className="block float-right bg-[#1F2937] text-[16px] px-[17px] py-[9px] rounded-3xl text-[#fff] mt-[15px] [select-none">
                                Start Interview
                            </span>
                        </div>
                        <div className="mt-[37px]">
                            <span className="block text-[20px] mb-[15px] font-semibold">Qualification</span>
                            <span className="block text-[14px] mb-[15px]">Discover how your skills align with the requirements of this position. Below is a detailed list of the essential skills needed for the role.</span>
                            <div>
                                <span className="inline-block text-[#1F2937] text-[14px] bg-[#E8E8E8] rounded-2xl px-[12px] py-[6px] mr-[8px] mb-[12px]">Accidental Death and Dismemberment (AD&D)</span>
                                <span className="inline-block text-[#1F2937] text-[14px] bg-[#E8E8E8] rounded-2xl px-[12px] py-[6px] mr-[8px] mb-[12px]">Amazon Web Services (AWS)</span>
                                <span className="inline-block text-[#1F2937] text-[14px] bg-[#E8E8E8] rounded-2xl px-[12px] py-[6px] mr-[8px] mb-[12px]">Analysis Skills</span>
                                <span className="inline-block text-[#1F2937] text-[14px] bg-[#E8E8E8] rounded-2xl px-[12px] py-[6px] mr-[8px] mb-[12px]">DevOps</span>
                                <span className="inline-block text-[#1F2937] text-[14px] bg-[#E8E8E8] rounded-2xl px-[12px] py-[6px] mr-[8px] mb-[12px]">Apache ActiveMQ</span>
                                <span className="inline-block text-[#1F2937] text-[14px] bg-[#E8E8E8] rounded-2xl px-[12px] py-[6px] mr-[8px] mb-[12px]">Application Programming Interface (API)</span>
                                <span className="inline-block text-[#1F2937] text-[14px] bg-[#E8E8E8] rounded-2xl px-[12px] py-[6px] mr-[8px] mb-[12px]">Call Center</span>
                                <span className="inline-block text-[#1F2937] text-[14px] bg-[#E8E8E8] rounded-2xl px-[12px] py-[6px] mr-[8px] mb-[12px]">Change Control</span>
                            </div>
                        </div>
                        <div className="mt-[25px]">
                            <span className="block text-[20px] mb-[15px] font-semibold">Required</span>
                            <ul className="list-disc ps-5 space-y-3 list-inside">
                                <li>3+ years of design experience</li>
                                <li>3+ years of delivering design solutions as a UX designer or interaction designer experience</li>
                                <li>Have an available online portfolio</li>
                                <li>Experience prototyping (HTML, XHTML, JavaScript, CSS, Flash or Flash Catalyst, or Axure)</li>
                            </ul>
                        </div>
                        <div className="mt-[25px]">
                            <span className="block text-[20px] mb-[15px] font-semibold">Preferred</span>
                            <ul className="list-disc ps-5 space-y-3 list-inside">
                                <li>2+ years of mass-market consumer web / mobile products experience</li>
                                <li>Experience working in a collaborative team and working directly with developers for implementation of designs</li>
                            </ul>
                        </div>
                        <span className="mt-[16px] block w-full h-[1px] bg-[#E8E8E8]"></span>
                        <div className="mt-[37px]">
                            <span className="block text-[20px] mb-[15px] font-semibold">Responsibilities</span>
                            <ul className="list-disc ps-5 space-y-3 list-inside">
                                <li>Collaborate and work closely with product management, engineering, sales, and research from design concept to design solution, setting UX guidelines and driving cross-team collaboration and sharing, as well as establish best practices for interaction models and user interface designs throughout the team.</li>
                                <li>Work in a start-up style environment, where iteration is encouraged and design acumen is demonstrated through design end-to-end product ownership.</li>
                                <li>Communicate complex, interactive design concepts clearly and persuasively across different audiences and varying levels of the organization through excellent communication, presentation, interpersonal and analytical skills.</li>
                                <li>Earn trust with product managers to develop shared vision and use research and data to identify opportunities and inform decisions.</li>
                            </ul>
                        </div>
                        <span className="mt-[16px] block w-full h-[1px] bg-[#E8E8E8]"></span>
                        <div className="mt-[37px]">
                            <span className="block text-[20px] mb-[15px] font-semibold">Benefits</span>
                            <span className="block text-[16px] mb-[10px] font-medium">We believe happy team members create amazing work. Here’s what we offer to make that happen:</span>
                            <ul className="list-disc ps-5 space-y-3 list-inside">
                                <li>🏠 <span className="text-[16px] font-medium">Remote Flexibility:</span>Work from wherever you’re most productive and happy.</li>
                                <li>📈 <span className="text-[16px] font-medium">Equity Options:</span>Become a shareholder through our stock options plan after 6 months.</li>
                                <li>💳 <span className="text-[16px] font-medium">Meal Vouchers:</span>Enjoy an €8/day meal voucher to make your lunch break even better.</li>
                                <li>🍴 <span className="text-[16px] font-medium">Lunch at the Office:</span>If you’re in Bologna, we have lunch together at the office, and it is on us!</li>
                                <li>⚕️ <span className="text-[16px] font-medium">Health Coverage:</span>Comprehensive support through the Metasalute Health Assistance Fund.</li>
                                <li>🎂 <span className="text-[16px] font-medium">Birthday Bliss:</span>Celebrate your day with an extra day off, just for you.</li>
                                <li>🧠 <span className="text-[16px] font-medium">Mental Wellness:</span>Free access to iFeel, our psychological support platform.</li>
                                <li>🌎 <span className="text-[16px] font-medium">International Environment:</span>Grow your language skills while working with a diverse and global team.</li>
                            </ul>
                        </div>
                        <span className="mt-[16px] block w-full h-[1px] bg-[#E8E8E8]"></span>
                        <div className="mt-[37px]">
                            <span className="block text-[20px] mb-[15px] font-semibold">Company</span>
                            <div className="flex items-center mb-[18px]">
                                <span className="block w-[103px] h-[103px]  mr-[10px]  bg-[#D9D9D9] rounded-xl"></span>
                                <div className="">
                                    <span className="block text-[23px] mb-[10px] font-semibold">Company name</span>
                                    <span className="block text-[14px]  mb-[10px] text-[#717171">
                                        <span className="inline-block align-text-top mr-[6px]"><CalendarIcon /></span>
                                        Founded in 1979
                                        <span className="inline-block bg-[#734AE2] w-[7px] h-[7px] rounded-full mx-[13px]"></span>

                                        <span className="inline-block w-[14px] h-[14px] align-text-top mr-[6px]"><AddrLocationSvg /></span>
                                        Carlsbad, California, US
                                        <span className="inline-block bg-[#734AE2] w-[7px] h-[7px] rounded-full mx-[13px]"></span>

                                        <span className="inline-block align-text-top mr-[6px]"><UpperbodyIcon /></span>
                                        1001-5000 employees
                                        <span className="inline-block bg-[#734AE2] w-[7px] h-[7px] rounded-full mx-[13px]"></span>

                                        <span className="inline-block align-text-top mr-[6px]"><WorldBallIcon /></span>
                                        Website
                                    </span>
                                    <span className="block">
                                        <span className="inline-block align-text-top mr-[6px]"><CompanyXIcon /></span>
                                        <span className="inline-block align-text-top"><CompanyInIcon /></span>
                                    </span>
                                </div>
                            </div>
                            <div className="text-[14px]">
                                Kforce has a client that is seeking a UI/UX Developer in Madison, WI. Overview: In brief, we a handful of AI-powered tools for our workforce which could use a facelift to improve the overall user experience. In an ideal scenario, we would love to bring on someone that has the skills to work directly in our codebases (engineering skills) while they make improvements to the UI/UX based on their knowledge of best practices. We currently have three tools that users are interacting with; one is an Edge browser extension (JavaScript), one is using Streamlit web application (python currently but we'd be open to migrating this to some React/Angular/other framework), and the other is a basic React web application.
                            </div>
                        </div>
                        <span className="mt-[16px] block w-full h-[1px] bg-[#E8E8E8]"></span>
                    </div>
                </div>

                <div className="bg-[#FF94E41A] ml-5 w-[300px]">
                    <span className="ps-5 block text-[#19212D] text-[16px] font-semibold mb-[11px]">Why is this job a good fit for me?</span>

                    <div className="grid grid-cols-2 gap-4 place-self-center mb-[20px]">
                        <div className="flex flex-col justify-center items-center rounded-lg w-[110px] h-[81px] bg-[#fff]">
                            <ProcessCircle text_center_size={14} stroke_color={"#A688FA"} line_width={3} radius={23} progress_percent={93} text_bottom={"Education"}/>
                            <span className="mt-[5px] inline-block font-semibold text-[12px]">Education</span>
                        </div>

                        <div className="flex flex-col justify-center items-center rounded-lg w-[110px] h-[81px] bg-[#fff]">
                            <ProcessCircle text_center_size={14} stroke_color={"#A688FA"} line_width={3} radius={23} progress_percent={80} text_bottom={"Work Exp"}/>
                            <span className="mt-[5px] inline-block font-semibold text-[12px]">Work Exp</span>
                        </div>
                        
                        <div className="flex flex-col justify-center items-center rounded-lg w-[110px] h-[81px] bg-[#fff]">
                            <ProcessCircle text_center_size={14} stroke_color={"#A688FA"} line_width={3} radius={23} progress_percent={93} text_bottom={"Skills"}/>
                            <span className="mt-[5px] inline-block font-semibold text-[12px]">Skills</span>
                        </div>

                        <div className="flex flex-col justify-center items-center rounded-lg w-[110px] h-[81px] bg-[#fff]">
                            <ProcessCircle text_center_size={14} stroke_color={"#A688FA"} line_width={3} radius={23} progress_percent={44} text_bottom={"Exp. Level"}/>
                            <span className="mt-[5px] inline-block font-semibold text-[12px]">Exp. Level</span>
                        </div>
                    </div>
                    
                    

                    <span className="my-[16px] block w-full h-[1px] bg-[#4B4B4B3B]"></span>

                    <span className="block ps-5 text-[16px] mb-[4px] font-semibold">Relevant Experience ✅</span>
                    <ul className="list-disc ps-5 mb-[24px]">
                        <li className="text-[14px]">You have substantial experience as a UI/UX Designer, Interaction Designer, and User Research Specialist. Your role at Sohu aligns with designing interaction elements relevant to user experience design for digital products.</li>
                    </ul>

                    <span className="block ps-5 text-[16px] mb-[4px] font-semibold">Seniority ✅</span>
                    <ul className="list-disc ps-5 mb-[24px]">
                        <li className="text-[14px]">You have amassed over eight years of relevant experience, meeting the mid-level seniority requirement for the role.</li>
                    </ul>
                    
                    <span className="block ps-5 text-[16px] font-semibold mb-[4px]">Education ⚠️</span>
                    <ul className="list-disc ps-5 mb-[24px]">
                        <li className="text-[14px]">While you hold a Master's degree from Politecnico di Milano in Digital and Interaction Design, it doesn't strictly align with the specified fields of Computer Science, Computer Engineering, or Information Science and Technology required by the job.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
         
