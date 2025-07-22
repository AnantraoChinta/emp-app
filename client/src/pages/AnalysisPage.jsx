import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import recordingVideo from "../assets/recording1.mp4";
import "../index.css";
import "./AnalysisPage.css";

const MyBarChart = () => {
    const data = [
        { name: 'Jan', value: 120 },
        { name: 'Feb', value: 150 },
        { name: 'Mar', value: 90 },
        { name: 'Apr', value: 180 },
    ];

    return (
        <div style={{ width: '100%', maxWidth: '250px', height: 200, marginBottom: '20px', margin: '10px' }}>
            <h4>Sample Bar Chart</h4>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

// Component to hold your alignment graphs
const AlignmentGraphsSection = ({ slideType }) => {
    return (
        <div className="alignment-graphs-container">
            <HeatMapGraph />
            {/* This is how you "call" or render the MyBarChart component */}
            <MyBarChart/> 
            
        </div>
    );
};

// Hardcoded HeatMapGraph component (as from previous example)
const HeatMapGraph = () => {
    // Basic SVG for a hardcoded heatmap
    return (
        <div >
            <h3>Heat Map Graph </h3>
            
            <svg width="200" height="150" viewBox="0 0 200 150" style={{ border: '1px solid #ddd' }}>
                {/* Example cells for a hardcoded heatmap */}
                <rect x="0" y="0" width="50" height="50" fill="#ffcccc" />
                <rect x="50" y="0" width="50" height="50" fill="#ff9999" />
                <rect x="100" y="0" width="50" height="50" fill="#ff6666" />
                <rect x="150" y="0" width="50" height="50" fill="#ff3333" />

                <rect x="0" y="50" width="50" height="50" fill="#ccffcc" />
                <rect x="50" y="50" width="50" height="50" fill="#99ff99" />
                <rect x="100" y="50" width="50" height="50" fill="#66ff66" />
                <rect x="150" y="50" width="50" height="50" fill="#33ff33" />

                <rect x="0" y="100" width="50" height="50" fill="#ccccff" />
                <rect x="50" y="100" width="50" height="50" fill="#9999ff" />
                <rect x="100" y="100" width="50" height="50" fill="#6666ff" />
                <rect x="150" y="100" width="50" height="50" fill="#3333ff" />

                {/* Optional labels (simplified) */}
                <text x="25" y="25" fontSize="10" textAnchor="middle" fill="#000">1</text>
                <text x="75" y="25" fontSize="10" textAnchor="middle" fill="#000">2</text>
                <text x="125" y="25" fontSize="10" textAnchor="middle" fill="#000">3</text>
                <text x="175" y="25" fontSize="10" textAnchor="middle" fill="#000">4</text>

                <text x="25" y="75" fontSize="10" textAnchor="middle" fill="#000">5</text>
                <text x="75" y="75" fontSize="10" textAnchor="middle" fill="#000">6</text>
                <text x="125" y="75" fontSize="10" textAnchor="middle" fill="#000">7</text>
                <text x="175" y="75" fontSize="10" textAnchor="middle" fill="#000">8</text>

                <text x="25" y="125" fontSize="10" textAnchor="middle" fill="#000">9</text>
                <text x="75" y="125" fontSize="10" textAnchor="middle" fill="#000">10</text>
                <text x="125" y="125" fontSize="10" textAnchor="middle" fill="#000">11</text>
                <text x="175" y="125" fontSize="10" textAnchor="middle" fill="#000">12</text>
            </svg>
        </div>
    );
};

// transcript section
const TranscriptSection = ({ slideType }) => {
    // Hardcoded example transcript data
    const transcript = [
        { speaker: "Student", time: "00:00", text: "Students." },
        { speaker: "Teacher", time: "00:00", text: "What else?" },
        { speaker: "Multiple Students", time: "00:00", text: "Teacher." },
        { speaker: "Teacher", time: "00:00", text: "Could the teacher be trying to figure out some information about her students? So then your character can become –" },
        { speaker: "Student", time: "00:05", text: "I think it's about, like, creating different personalities for characters." },
        { speaker: "Teacher", time: "00:10", text: "That's a very good point. And how do you create different personalities?" },
        { speaker: "Student", time: "00:15", text: "By giving them different backgrounds and experiences." },
        { speaker: "Teacher", time: "00:20", text: "Excellent. And why is that important for storytelling?" },
        { speaker: "Multiple Students", time: "00:25", text: "It makes the story more relatable." },
        { speaker: "Teacher", time: "00:30", text: "Indeed. What about character arcs?" },
        { speaker: "Student", time: "00:35", text: "Characters change throughout the story." },
        { speaker: "Teacher", time: "00:40", text: "Exactly. How does internal conflict play a role?" },
        { speaker: "Student", time: "00:45", text: "It's the struggle within the character." },
        { speaker: "Teacher", time: "00:50", text: "Right. And external conflict?" },
        { speaker: "Multiple Students", time: "00:55", text: "It's the struggle with outside forces." },
        { speaker: "Teacher", time: "01:00", text: "Perfect. Any other questions about character development?" },
    ];


    return (
        <div className="transcript-section">
            <h3>Transcript for {slideType} Talk</h3>
            <div className="transcript-content">
                {transcript.map((line, index) => (
                    <div key={index} className={`transcript-line ${line.speaker.toLowerCase().replace(/\s/g, '-')}`}>
                        <div className="speaker-label" style={{ borderLeftColor: line.speaker === "Teacher" ? '#2196f3' : line.speaker === "Student" ? '#cddc39' : '#999' }}>
                            {line.speaker} <span className="timestamp">{line.time}</span>
                        </div>
                        <div className="dialogue">{line.text}</div>
                        {/* Adding action icons like in your screenshot */}
                        <div className="transcript-actions">
                            <span className="action-icon">?</span>
                            <span className="action-icon">📝</span>
                            <span className="action-icon">⭐</span>
                            <span className="action-icon">💬</span>
                            <span className="action-icon">+</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

  

export default function AnalysisPage() {
    /* ─── Slideshow state ─────────────────────────────── */
    //   /* ─── slideshow state ─────────────────────────────── */
    const slides = ["Relational", "Instructional"];
    const [slideIndex, setSlideIndex] = useState(0);
    const activeSlide = slides[slideIndex];
    const nextSlide  = () => setSlideIndex((i) => (i + 1) % slides.length);
    const prevSlide  = () => setSlideIndex((i) => (i - 1 + slides.length) % slides.length);

    //   /* ─── video control ───────────────────────────────── */
    const videoRef = useRef(null);
    const seekTo = (sec) => {
        if (videoRef.current) {
        videoRef.current.currentTime = sec;
        videoRef.current.play();
        }
    };
    /* ─── Demo timeline data (static for all slides) ──── */
    const teacherSegments = [
    { start: 0, duration: 8 },
    { start: 15, duration: 5 },
    { start: 25, duration: 10 },
    { start: 40, duration: 6 },
    { start: 55, duration: 7 },
    ];
    const studentSegments = [
    { start: 8, duration: 7 },
    { start: 20, duration: 5 },
    { start: 35, duration: 5 },
    { start: 46, duration: 9 },
    { start: 62, duration: 6 },
    ];
    const summaryData = [
        { label: "Uptake", value: 24, change: "up", blurb: "Uptake increased from last session." },
        { label: "Reasoning", value: 4, change: "down", blurb: "Reasoning decreased from last session." },
        { label: "Questioning", value: 111, change: "up", blurb: "More questions asked this time." },
        { label: "Focusing Question", value: 2, change: "down", blurb: "Fewer focusing questions." },
    ];
    /* ─── Timeline drawing helpers ─────────────────────── */
    const scale = 10; // 1 time‑unit ⇒ 10 px
    const totalTime = 70;
    const tickInterval = 10;
    const ticks = Array.from({ length: totalTime / tickInterval + 1 }, (_, i) => i * tickInterval);

    const svgTimeline = (
    <svg width="700" height="90" style={{ cursor: "pointer" }}>
        {/* grid + labels */}
        {ticks.map((t) => (
        <g key={t}>
            <line x1={t * scale} x2={t * scale} y1={0} y2={60} stroke="#eee" />
            <text x={t * scale} y={75} fontSize="10" textAnchor="middle" fill="#999">{t}:00</text>
        </g>
        ))}

        {/* bars */}
        {teacherSegments.map((seg, i) => (
        <rect
            key={`t-${i}`}
            x={seg.start * scale}
            y={10}
            width={seg.duration * scale}
            height={12}
            fill="#2196f3"
            rx="2"
            // When clicked, go to time frame
            onClick={() => seekTo(seg.start)}
            opacity={0.9}
        />
        ))}
        {studentSegments.map((seg, i) => (
        <rect
            key={`s-${i}`}
            x={seg.start * scale}
            y={34}
            width={seg.duration * scale}
            height={12}
            fill="#cddc39"
            rx="2"
            onClick={() => seekTo(seg.start)}
            opacity={0.9}
        />
        ))}
    </svg>
    );
    
    
    

    /* ─── slide‑specific content ──────────────────────── */
    const slideContent = {
        Relational: (
            <div className="slide-content-wrapper">
                <div className="video-section">
                    <video ref={videoRef} width="600" height="340" controls>
                        <source src={recordingVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <p className="hint">Click any segment in the timeline above to jump to that moment.</p>
                </div>
                <AlignmentGraphsSection slideType="Relational" />
                {/* NEW: Transcript Section below graphs */}
                <TranscriptSection slideType="Relational" />
            </div>
        ),
        Instructional: (
            <div className="slide-content-wrapper">
                <div className="video-section">
                    <video ref={videoRef} width="600" height="340" controls>
                        <source src={recordingVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <p className="hint">Click any segment in the timeline above to jump to that moment.</p>
                </div>
                <AlignmentGraphsSection slideType="Instructional" />
                {/* NEW: Transcript Section below graphs */}
                <TranscriptSection slideType="Instructional" />
            </div>
        ),

        
    };

    /* ─── Render ───────────────────────────────────────── */
    return (
        <main className="analysis-wrapper">
            

        <div className="section">
            <h2>Talk Moments Summary</h2>
            <p>Summary of the different Talk moments observed in the class.</p>
            <div className="summary-grid">
                {summaryData.map((item, i) => (
                    <div key={i} className="summary-tile with-arrow">
                    
                    <div className="summary-content">
                        <div className="summary-label">{item.label}</div>
                        <div className="summary-value">{item.value}</div>
                    </div>

                    <div className={`summary-arrow ${item.change}`}>
                        {item.change === "up" ? "▲" : "▼"}
                        <span className="blurb-tooltip">{item.blurb}</span>
                    </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="section">
            <h2>Talk Moments</h2>
            <p>The chart below can help you explore when and how different talk moves were used in the class session.</p>

            <div className="timeline-carousel">
            {/* tabs */}
            <div className="carousel-tabs">
                {slides.map((label, idx) => (
                <span key={label} className={`tab ${idx === slideIndex ? "active" : ""}`} onClick={() => setSlideIndex(idx)}>
                    {label}
                </span>
                ))}
            </div>

            {/* arrows */}
            <button className="carousel-arrow left"  onClick={prevSlide}>‹</button>
            <button className="carousel-arrow right" onClick={nextSlide}>›</button>

            {/* animated slide container */}
            <div className="timeline-viewport">
                <AnimatePresence mode="wait">
                <motion.div
                    key={slideIndex}
                    className="timeline-slide"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    {svgTimeline}
                    <div className="timeline-labels">
                    <span className="teacher-label">Teacher</span>
                    <span className="student-label">Student</span>
                    </div>
                    {slideContent[activeSlide]}
                    
                   
                </motion.div>
                </AnimatePresence>
            </div>
            </div>
        </div>
        
        

        {/* footer nav … */}
        <div className="footer-nav">
            <Link to="/lessons" className="btn-primary">← Back to Lessons</Link>
        </div>
        </main>
    );
}

