import { useEffect, useState } from 'react';
import {useNavigate, useParams } from 'react-router'
import { PROBLEMS } from '../data/problems';
import Navbar from '../components/Navbar';

const ProblemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentProblemId, setCurrentProblemId] = useState("two-sum");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutPut] = useState(false);

    const currentProblem = PROBLEMS[currentProblemId];

    // Update problem when URL param change
    useEffect(() => {
      if (id && PROBLEMS[id]) {
        setCurrentProblemId(id);
        setCode(PROBLEMS[id].starterCode[selectedLanguage]);
        setOutPut(null);
      }
    }, [id, selectedLanguage]);

    const handleLanguageChange = () => {};

    const handleProblemChange = () => {};

    const triggerConfetti = () => {};

    const checkIfTestsPassed = () => {};

    const handleRunCode = () => {};

   return (
    <div className='border border-red-500 h-screen w-screen bg-base-100 flex flex-col'>
    <Navbar />
    </div>
  )
}

export default ProblemDetail;