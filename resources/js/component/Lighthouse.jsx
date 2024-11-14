import React,{useState} from 'react';
import {Container, Row, Col,Button } from 'react-bootstrap';
import '../../css/app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearchengin} from '@fortawesome/free-brands-svg-icons';

const Lighthouse = () => {
    const [url,SetInput] = useState('');
    const [platform, SetPlatform] = useState('desktop');
    const [performanceScore, SetPerformanceScore] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleUrl = (e) => {
        SetInput(e.target.value);
    }
    const handlePlatformChange = (e) => {
        SetPlatform(e.target.value);
    }

    const submitForm = async  (e) => {
        e.preventDefault();
        if(!url){
            alert('Enter Url');
            return;
        }

        setIsButtonDisabled(true);
        const response = await fetch('api/performance-score',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({url,platform}),
        });
       const data = await response.json();
       if(data.performance_score){
           SetPerformanceScore(data.performance_score);
           setIsButtonDisabled(false);
       }else {
           setIsButtonDisabled(false);
           alert('Failed to fetch performance score');
       }
    };


    return (
        <div style={{background:"grey"}}>

        <Container
            className="main-section"
        >

            <Row>
                <h2 style={{color:"white",marginLeft:"2%"}}>Search engine optimization (SEO) Made Easy</h2>
                <Col md={12}>
                    <div className="d-flex">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type Web Address"
                            onChange={handleUrl}
                            value={url}

                        />
                        <Button
                            className="form-control-button"
                            onClick={submitForm}
                            disabled={isButtonDisabled}
                        >
                            <FontAwesomeIcon icon={faSearchengin} style={{ fontSize:"15px"}} />  Seo Analyziz
                        </Button>
                    </div>
                </Col>
                <Col md={12} className="platform-selection" style={{ marginLeft: "2%"}}>
                    <label style={{ color: 'white' }}>Select Platform:</label>
                    <select className="form-select" value={platform} onChange={handlePlatformChange}>
                        <option value="desktop">Desktop</option>
                        <option value="mobile">Mobile</option>
                    </select>
                </Col>
                {performanceScore !== null && (
                    <Col md={12} className="mt-3">
                        <h4 style={{ color: 'white' }}>Performance Score: {performanceScore}</h4>
                    </Col>
                )}
            </Row>

        </Container>
        </div>
    );
}

export default Lighthouse;
