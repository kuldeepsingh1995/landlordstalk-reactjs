import {React, Component, useState, useEffect, useCallback} from "react";
import graphimg from "../../../assets/images/graph.PNG"
import { ActionNames, createAction } from "../../../services";
import "./Dashboard.css"
import Chart from "react-google-charts";

 
const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [chartPeriodType, setChartPeriodType] = useState('all');

    const searchStats = useCallback(async () => {
        
    try {
        let search = {type: chartPeriodType}
        const fetching = createAction(ActionNames.ADMIN_DASHBOARD, search);
        const resp_data = fetching.payload;
        resp_data.then((resp) => {
            setStats(resp.data);
        })
        

    } catch (e) {
        console.log(e);
    }
    });

    useEffect(() => {
        searchStats()

    }, [chartPeriodType]);
      
        return (
            <>
                <div className="admin-card">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="admin-card-header">
                                <h1>Latest Stats</h1>
                                <span className="admin-header-icon"><i className='bx bx-info-circle'></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-4 col-lg-6 col-sm-4">
                            <div className="stat-div">
                                <i className='bx bxs-user'></i>
                                <div className="stat">
                                    <h3>{(stats) && stats.count_users}</h3>
                                    <p>New Users</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-sm-4">
                            <div className="stat-div">
                                <i className='bx bxs-message-edit'></i>
                                <div className="stat">
                                    <h3>{(stats) && stats.count_review}</h3>
                                    <p>New Reviews</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-sm-4">
                            <div className="stat-div">
                                <i className='bx bx-credit-card'></i>
                                <div className="stat">
                                    <h3>0</h3>
                                    <p>New Subscriptions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="admin-card">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="admin-card-header">
                                <h1>Latest Stats</h1>
                                <span className="admin-header-icon"><i className='bx bx-info-circle'></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                             <div style={{ display: 'flex',flexWrap:"wrap", maxWidth: 10000 }}>
                                 <div class="chart-div-btn"> 
                                     <button type="button" onClick={() => setChartPeriodType('all')} className={chartPeriodType=='all' ? 'active-chart' : ''}>All time</button>
                                     <button type="button" onClick={() => setChartPeriodType('year')} className={chartPeriodType=='year' ? 'active-chart' : ''}>This year</button>
                                     <button type="button" onClick={() => setChartPeriodType('week')} className={chartPeriodType=='week' ? 'active-chart' : ''}>This week</button>
                                     <button type="button" onClick={() => setChartPeriodType('today')} className={chartPeriodType=='today' ? 'active-chart' : ''}>Today</button>
                                 </div>
                                 {
                                     (stats && stats.stats) &&
                                     <Chart
                                        width={'100%'}
                                        height={350}
                                        chartType="ColumnChart"
                                        loader={<div>Loading Chart</div>}
                                        data={stats.stats}
                                        options={{
                                        title: '',
                                        hAxis: {
                                            // title: 'Total Population',
                                            minValue: 0,
                                        },
                                        seriesType: 'bars',
                                        series: {5: {type: 'line'}},
                                        // vAxis: {
                                        //     title: 'City',
                                        // },
                                        }}
                                        // legendToggle
                                    />
                                 }
                                
                                </div>
                        </div>
                    </div>
                </div>
                
            </>
        );
    }


export default Dashboard;