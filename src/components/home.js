import React, {useEffect, useState} from "react";
import SearchAppBar from "./appbar";
import CustomizedAccordions from "./accordins";
import axios from "axios";
import { Chart } from "react-google-charts";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import API from "./API";

// Home component contains the components which are to be displayed on the home screen
const Home = () =>{
    const [policies, setPolicies] = useState([])
    const [search, setSearch] = useState(false)
    const [policyCount,setPolicyCount] = useState(0)
    const [data,setData] = useState(0)
    const [chart,setChart] = useState(false)

    const showChart =(region)=>{
        //Api call to get the data required for chart preparation

        axios.get(`http://127.0.0.1:8000/medi/chart/${region}`).then((res)=>{

            setPolicyCount(res.data)
            setChart(true)
        }).catch((err)=>{
            console.log(err)
            setChart(false)
        })
    }

    //Function to get the policies as specified in the search parameter
    const getData= (data) =>{
        setData(data)
        setSearch(true)
        if (!isNaN(data))
        //    api call to fetch the policies
            API.fetch_policy(data)
                .then((res)=>{
                    console.log(res)
                    setPolicies(res.data)
                })
                .catch((err)=>{
                    console.log(err)
                    setPolicies(null)
                })

    }

    return(
        <>
            <Grid container xs={12}>
                <Grid item xs={12}>
                    <SearchAppBar heading={"MediAssist Insurance"} search={getData}/>
                </Grid>
                <Grid item container  xs={12}   alignItems="center" justifyContent="center">
                        {/* policies have been fetched, render Policies*/}
                        { policies?
                            <Grid item xs={12} style={{margin:'8px'}}>
                            <CustomizedAccordions key={policies.policy_id} policy={policies} search={getData} data={data}/>
                            </Grid>:
                            //else display a error message
                            {search}&&
                                <Grid item xs={12}><p style={{textAlign:'center'}}>
                                    No Policies found with policy id : {data}
                                </p></Grid>
                        }
                    <Grid item xs={12} container >
                        {/*Select option to display chart*/}
                        <Grid item container xs={12} justifyContent="center" style={{margin:'10px'}} alignItems={'center'}>
                            <p style={{textAlign:'center'}} >
                                Select Region To display Chart
                            </p>
                            <select id="region" placeholder={'region'} onChange={(e)=>{showChart(e.target.value)}} >
                                <option value="">Region</option>
                                <option value="North">North</option>
                                <option value="South">South</option>
                                <option value="West">West</option>
                                <option value="East">East</option>
                            </select>
                        </Grid>
                        {/*Select option to display chart*/}

                        {/*Chart*/}
                        <Grid item xs={12}>
                            {chart&&<Chart
                                chartType="ScatterChart"
                                data={policyCount}
                                width="100%"
                                height="250px"
                                legendToggle
                                options={ {
                                    title: "Policies Per Month ------>",
                                    hAxis: {
                                        title: "Month---->",
                                        viewWindow: { min: 0, max: 12 }
                                    },
                                    vAxis: { title: "Number Of Policy---->", viewWindow: { min: 0, max: 200 } },
                                    legend: "none"
                                }}
                            />}
                        </Grid>
                        {/*    Chart */}
                    </Grid>
                </Grid>


            </Grid>
        </>

    )
}

export default Home
