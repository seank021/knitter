import React, { useState, useEffect } from "react";
import "../../../css/design.css";
import ColorPicker from "./color-picker";
import { TextInputLarge, LongTextInput } from "../../../components/input";
import { Button } from "../../../components/button";
import plus from "../../../assets/icons/plus.png";
import minus from "../../../assets/icons/minus.png";
import { collection, doc, getDocs, query, orderBy, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const DesignCreate = () => {
    const [userEmail, setUserEmail] = useState(null);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("firebase:authUser:" + process.env.REACT_APP_API_KEY + ":[DEFAULT]"));
        if (user) {
            setUserEmail(user.email);
            setUserId(user.uid);
        }
    }, []);
    const [designTitle, setDesignTitle] = useState("");
    const [designDescription, setDesignDescription] = useState("");
    const [selectedColor, setSelectedColor] = useState("#000000");
    const [design, setDesign] = useState({
        width: 30,
        height: 30,
        cells: Array.from({ length: 30 * 30 }, (_, index) => ({
            row: Math.floor(index / 30),
            column: index % 30,
            color: "#ffffff"
        })),
        title: "",
        description: "",
        comments: null,
        like: 0,
        download: 0,
        creator: userEmail,
    });

    const [id, setId] = useState(1);
    useEffect(() => {
        const fetchDesignsCount = async () => {
            if (userId) {
                try {
                    const designsRef = collection(db, userId);
                    const snapshot = await getDocs(query(designsRef, orderBy('id')));
                    const designsCount = snapshot.size;
                    setId(designsCount + 1); // Set the new id
                } catch (error) {
                    console.error("Error fetching designs count:", error);
                }
            }
        };
        fetchDesignsCount();
    }, [userId]);

    useEffect(() => {
        if (userEmail) {
            setDesign(prevDesign => ({
                ...prevDesign,
                creator: userEmail,
            }));
        }
    }, [userEmail]);

    const handleCellClick = (row, column) => {
        const updatedCells = design.cells.map(cell => 
            cell.row === row && cell.column === column
                ? { ...cell, color: selectedColor }
                : cell
        );

        setDesign({
            ...design,
            cells: updatedCells
        });
    };

    const handleResize = (direction) => {
        let newWidth = design.width;
        let newHeight = design.height;
        let newCells = [...design.cells];

        if (direction === 'add-row-top') {
            newCells = newCells.map(cell => ({ ...cell, row: cell.row + 1 }));
            newHeight += 1;
        }
        if (direction === 'add-row-bottom') {
            newHeight += 1;
        }
        if (direction === 'remove-row-top' && newHeight > 1) {
            newCells = newCells.filter(cell => cell.row > 0).map(cell => ({ ...cell, row: cell.row - 1 }));
            newHeight -= 1;
        }
        if (direction === 'remove-row-bottom' && newHeight > 1) {
            newCells = newCells.filter(cell => cell.row < newHeight - 1);
            newHeight -= 1;
        }
        if (direction === 'add-col-left') {
            newCells = newCells.map(cell => ({ ...cell, column: cell.column + 1 }));
            newWidth += 1;
        }
        if (direction === 'add-col-right') {
            newWidth += 1;
        }
        if (direction === 'remove-col-left' && newWidth > 1) {
            newCells = newCells.filter(cell => cell.column > 0).map(cell => ({ ...cell, column: cell.column - 1 }));
            newWidth -= 1;
        }
        if (direction === 'remove-col-right' && newWidth > 1) {
            newCells = newCells.filter(cell => cell.column < newWidth - 1);
            newWidth -= 1;
        }

        setDesign({
            ...design,
            width: newWidth,
            height: newHeight,
            cells: newCells
        });
    };

    const onReset = () => {
        if (window.confirm("작성을 취소하시겠습니까?")) {
            setDesign({
                width: 30,
                height: 30,
                cells: Array.from({ length: 30 * 30 }, (_, index) => ({
                    row: Math.floor(index / 30),
                    column: index % 30,
                    color: "#ffffff"
                })),
                title: "",
                description: "",
                comments: null,
                like: 0,
                download: 0,
                creator: userEmail,
            });

            setDesignTitle("");
            setDesignDescription("");

            alert("도안 작성이 취소되었습니다.");
        }
    };

    const onSave = async () => {
        if (!designTitle || !designDescription) {
            alert("도안의 제목과 설명을 입력하세요.");
            return;
        }

        if (window.confirm("저장하시겠습니까?")) {
            try {
                const designRef = doc(db, userId, id.toString());
                await setDoc(designRef, {
                    ...design,
                    title: designTitle,
                    description: designDescription,
                    id: id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });

                alert("도안이 저장되었습니다.");
            } catch (error) {
                console.error("Error saving design:", error);
            }
        }
    };

    const downloadPNG = () => {
        html2canvas(document.querySelector(".design-container")).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'design.png';
            link.click();
        });
    };

    const downloadPDF = () => {
        html2canvas(document.querySelector(".design-container")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 210; // A4 width in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('design.pdf');
        });
    };

    return (
        <div className="design-wrapper gap-10">
            <div className="flex flex-col justify-between gap-3">
                <TextInputLarge type="text" placeholder="도안의 제목을 입력하세요" value={designTitle} onChange={e => setDesignTitle(e.target.value)} />
                <LongTextInput type="text" placeholder="도안에 대한 설명을 입력하세요" value={designDescription} onChange={e => setDesignDescription(e.target.value)} />
            </div>
            <div className="flex flex-row justify-between gap-3 mb-5">
                선택한 색상: <ColorPicker color={selectedColor} onChange={setSelectedColor} />
            </div>

            <div
                className="design-container"
                style={{
                    '--grid-width': design.width,
                    '--grid-height': design.height
                }}
            >
                {Array.from({ length: design.width * design.height }).map((_, index) => {
                    const row = Math.floor(index / design.width);
                    const column = index % design.width;
                    const cell = design.cells.find(c => c.row === row && c.column === column);
                    const backgroundColor = cell ? cell.color : "#fff";

                    return (
                        <div
                            key={index}
                            className="cell"
                            style={{ backgroundColor }}
                            onClick={() => handleCellClick(row, column)}
                        />
                    );
                })}

                {/* Resize handlers at corners */}
                <div className="resize-handler add-row-top" onClick={() => handleResize('add-row-top')}><img src={plus} alt="+" /></div>
                <div className="resize-handler remove-row-top" onClick={() => handleResize('remove-row-top')}><img src={minus} alt="-" /></div>
                <div className="resize-handler add-row-bottom" onClick={() => handleResize('add-row-bottom')}><img src={plus} alt="+" /></div>
                <div className="resize-handler remove-row-bottom" onClick={() => handleResize('remove-row-bottom')}><img src={minus} alt="-" /></div>
                <div className="resize-handler add-col-left" onClick={() => handleResize('add-col-left')}><img src={plus} alt="+" /></div>
                <div className="resize-handler remove-col-left" onClick={() => handleResize('remove-col-left')}><img src={minus} alt="-" /></div>
                <div className="resize-handler add-col-right" onClick={() => handleResize('add-col-right')}><img src={plus} alt="+" /></div>
                <div className="resize-handler remove-col-right" onClick={() => handleResize('remove-col-right')}><img src={minus} alt="-" /></div>
            </div>
            
            <div className="flex flex-col gap-5 mt-10 mb-10">
                <div className="flex flex-row justify-center gap-5">
                    <Button onClick={onReset}>취소하기</Button>
                    <Button onClick={onSave}>생성하기</Button>
                </div>
                <div className="flex flex-row justify-center gap-5">
                    <Button onClick={downloadPNG}>이미지(png) 다운로드</Button>
                    <Button onClick={downloadPDF}>파일(pdf) 다운로드</Button>
                </div>
            </div>
        </div>
    );
}

export default DesignCreate;
