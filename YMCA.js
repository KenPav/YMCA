var Testing = function(processingInstance) {
    with (processingInstance) {

        size(800,1200); 
        frameRate(30);
        
        // ProgramCodeGoesHere

         var msg= "03.11.22/13:00";       

         var FirstColor = color(0, 0, 0);
         var SecondColor = color(135,10,10);
         var ThirdColor = color(70,50,168);
         var BoxColor = color(255,255,255);
         var SelectBoxColor = color(0,255,200);
         var WarningColor = color(255,0,0);
         var BackColor = color(180,200,240);
         stroke(FirstColor);
         strokeWeight(2);

         const Machine = ["1","2","3","4","5","6","7","8","9","10","11","12 F","12 RD","13 AB","13 AD"];
         const MachineDesc = ["#1 Leg Press/Toe Lift","#2 Leg Extension","#3 Seated Leg Curl","#4 Chest Press","#5 Overhead Press","#6 Arm Curl","#7 Arm Extension","#8 Row","#9 Back Extension","#10 Abdominal","#11 Pull Down","#12 Pectoral Fly","#12 Rear Deltoids","#13 Hip Abduction","#13 Hip Adduction"]
         const MachineWeight = [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50];
         const MachineReps = [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15];
         const MachineSets = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3];
         const MachineComplete = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
         var AreYouSure = 0;
         var Current = 0;
         var Activity = 0;
         var chkWeight = 0;
         // Machine Weight, Reps, Sets (c)urrent Value
         var MWc = 0;
         var MRc = 0;
         var MSc = 0;
         // Machine Weight, Reps, Sets (m)inimum Value
         var MWm = 0;
         var MRm = 0;
         var MSm = 0;
         // Machine Weight, Reps, Sets (p)ointer Value
         var MWp = 0;
         var MRp = 0;
         var MSp = 0;
         


//      SELECT MACHINE FOR USE
        selectActivity = function() {
            if(chkWeight===0) {
                chkWeight = 1;
                if(window.localStorage.getItem('MW')!=null) {
                    var MW1 = JSON.parse(window.localStorage.getItem('MW'));
                    var MR1 = JSON.parse(window.localStorage.getItem('MR'));
                    var MS1 = JSON.parse(window.localStorage.getItem('MS'));
//                    var MC1 = JSON.parse(window.localStorage.getItem('MC'));
                    for (i=0; i<15; i++) {
                        MachineWeight[i]=Number(MW1[i]);
                        MachineReps[i]=Number(MR1[i]);
                        MachineSets[i]=Number(MS1[i]);
//                        MachineComplete[i]=Number(MC1[i]);
                    }
                }
            }
            background(BackColor);
            textSize(50);
            textAlign(CENTER);
            fill(SelectBoxColor);
            rect(50,20,700,70);
            fill(SecondColor);
            text("SELECT CYBEX STATION",400,75);

            for (i=0; i<5; i++) {
                for (j=0; j<3; j++) {
                    if (MachineComplete[i+j*5] === 1) {
                        fill(SelectBoxColor);
                        rect(25+i*150,100+j*100,150,100);
                        fill(FirstColor);
                        text(Machine[i+j*5],100+i*150,170+j*100)
                    } else {
                        fill(BoxColor);
                        rect(25+i*150,100+j*100,150,100);
                        fill(FirstColor);
                        text(Machine[i+j*5],100+i*150,170+j*100)
                    }
                }
            }
            fill(BoxColor);
            rect(100,450,600,100);
            rect(100,600,600,100);
            if(AreYouSure===1) {
                fill(WarningColor);
                rect(100,750,600,100);
                fill(BoxColor);
                rect(200,900,400,100);            
            }
            fill(FirstColor);
            text("Clear Workout Session",400,520);
            text("Clear Weights, Reps, Sets",400,670);
            if(AreYouSure===1) {
                text("Confirm Deletion of",400,790);            
                text("Weights, Reps & Sets Info",400,840);
                text("Cancel Deletion",400,970);
            }
        }


//      INDIVIDUAL MACHINE WORKOUT
        MachineWorkout = function() {          
            background(BackColor);
            textSize(50);
            textAlign(CENTER);
            fill(SelectBoxColor);
            rect(50,20,700,70);
            fill(SecondColor);
            text(MachineDesc[Current],400,75);

            for (i=0; i<7; i++) {
                for (j=0; j<3; j++) {
                    fill(BoxColor)
                    if(j===0 && i===MWp) {
                        fill(SelectBoxColor);
                    }
                    if(j===1 && i===MRp) {
                        fill(SelectBoxColor);
                    }
                    if(j===2 && i===MSp) {
                        fill(SelectBoxColor);
                    }
                    rect(50+i*100,200+j*200,100,100);
                }
            }
            fill(FirstColor);
            for (i=0; i<5; i++) {
                text(MWm+i*5,200+i*100,275);
                text(MRm+i*5,200+i*100,475);
                text(MSm+i,200+i*100,675);
            }
            for (i=0; i<3; i++) {
                text("-",100,275+i*200);
                text("+",700,275+i*200);
            }
            textAlign(LEFT);            
            text("Select Machine Weight",50,190);
            text("Select Repititions for Workout",50,390);
            text("Select Sets for Workout",50,590);
            textAlign(CENTER);

            fill(BoxColor);
            rect(100,800,600,100);
            rect(100,950,600,100);
            fill(FirstColor);
            text("Workout Sets Complete",400,880);
            text("Select Different Machine",400,1020);
            }


        mouseClicked = function() {

            if(Activity === 0) {

                for (i=0; i<5; i++) {
                    for (j=0; j<3; j++) {
                        if(mouseX>=25+i*150 && mouseX<=175+i*150 && mouseY>=100+j*100 && mouseY<=200+j*100) {
                            Current = i+j*5;
                            MWc = MachineWeight[Current];
                            MRc = MachineReps[Current];
                            MSc = MachineSets[Current];
                            Activity = 1;
                            if(MWc<15) {
                                MWm = 5;
                                MWp = (MWc-MWm+5)/5;
                            } else {
                                MWm = MWc-10;
                                MWp = 3;
                            }
                            if(MRc<15) {
                                MRm = 5;
                                MRp = (MRc-MRm+5)/5;
                            } else {
                                MRm = MRc-10;
                                MRp = 3;
                            }
                            if(MSc<3) {
                                MSm = 1;
                                MSp = (MSc-MSm+1);
                            } else {
                                MSm = MSc-2;
                                MSp = 3;
                            }


                        }
                    }
                }
                if(mouseX>=100 && mouseX<=700 && mouseY>=450 && mouseY<=550) {
                    for (i=0; i<15; i++) {
                        MachineComplete[i] = 0;
                    }
                }
                if(mouseX>=100 && mouseX<=700 && mouseY>=600 && mouseY<=700) {
                    AreYouSure = 1;
                }
                if(mouseX>=100 && mouseX<=700 && mouseY>=750 && mouseY<=850) {
                    window.localStorage.removeItem('MW'); 
                    window.localStorage.removeItem('MR');
                    window.localStorage.removeItem('MS');
                    window.localStorage.removeItem('MC');                    
                    for (i=0; i<15; i++) {
                        MachineWeight[i]=50;
                        MachineReps[i]=15;
                        MachineSets[i]=3;
                        MachineComplete[i]=0;
                    }
                    AreYouSure = 0;
                }
                if(mouseX>=200 && mouseX<=600 && mouseY>=900 && mouseY<=1000) {
                    AreYouSure = 0;
                }

            }

//          MACHINE WEIGHT SELECTION

            if(Activity===1) {

                for (i=1; i<6; i++) {
                    for (j=0; j<3; j++) {
                        if(mouseX>=50 && mouseX<=150 && mouseY>=200 && mouseY<=300) {
                            console.log("MWm",MWm)
                            MWm = MWm - 4 * 5;
                            if (MWm < 5) { MWm = 5;}
                            MWp = (MWc-MWm+5)/5;
                            return;
                        }                        
                        if(mouseX>=50 && mouseX<=150 && mouseY>=400 && mouseY<=500) {
                            MRm = MRm - 4 * 5;
                            if (MRm < 5) { MRm = 5;}                            
                            MRp = (MRc-MRm+5)/5;
                            return;
                        }                        
                        if(mouseX>=50 && mouseX<=150 && mouseY>=600 && mouseY<=700) {
                            MSm = MSm - 4 * 1;
                            if (MSm < 1) { MSm = 1;}                                                        
                            MSp = (MSc-MSm+1);
                            return;
                        }                        
                        if(mouseX>=650 && mouseX<=750 && mouseY>=200 && mouseY<=300) {
                            console.log("MWm",MWm)                            
                            MWm = MWm + 4 * 5;
                            MWp = (MWc-MWm+5)/5;
                            return;
                        }                        
                        if(mouseX>=650 && mouseX<=750 && mouseY>=400 && mouseY<=500) {
                            MRm = MRm + 4 * 5;                            
                            MRp = (MRc-MRm+5)/5;
                            return;
                        }                        
                        if(mouseX>=650 && mouseX<=750 && mouseY>=600 && mouseY<=700) {
                            MSm = MSm + 4 * 1;                            
                            MSp = (MSc-MSm+1);
                            return;
                        }                        
                        if(mouseX>=50+i*100 && mouseX<=150+i*100 && mouseY>=200+j*200 && mouseY<=300+j*200) {
                            console.log("i,j",i,j);
                            if (j===0) {
                                MWc = MWm + (i-1)*5;
                                console.log("MWc, MWm",MWc,MWm);
                                MachineWeight[Current] = MWc;
                            }
                            if (j===1) {
                                MRc = MRm + (i-1)*5;
                                console.log("MRc, MRm",MWc,MWm);
                                MachineReps[Current] = MRc;
                            }
                            if (j===2) {
                                MSc = MSm + (i-1)*1;
                                console.log("MSc, MSm",MWc,MWm);
                                MachineSets[Current] = MSc;
                            }

                            if(MWc<15) {
                                MWm = 5;
                                MWp = (MWc-MWm+5)/5;
                            } else {
                                MWm = MWc-10;
                                MWp = 3;
                            }
                            if(MRc<15) {
                                MRm = 5;
                                MRp = (MRc-MRm+5)/5;
                            } else {
                                MRm = MRc-10;
                                MRp = 3;
                            }
                            if(MSc<3) {
                                MSm = 1;
                                MSp = (MSc-MSm+1);
                            } else {
                                MSm = MSc-2;
                                MSp = 3;
                            }

                            window.localStorage.setItem('MW',JSON.stringify(MachineWeight));
                            window.localStorage.setItem('MR',JSON.stringify(MachineReps));
                            window.localStorage.setItem('MS',JSON.stringify(MachineSets));

                            return;
                        }
                    }
                }




                if(mouseX>=100 && mouseX<=700 && mouseY>=800 && mouseY<=900) {
                    MachineComplete[Current] = 1;
                    window.localStorage.setItem('MC',JSON.stringify(MachineComplete));
                    Activity = 0;
                }
                if(mouseX>=100 && mouseX<=700 && mouseY>=950 && mouseY<=1050) {
                    Activity = 0;
                }

            }


        }

        draw = function() {
            if(Activity === 0) {
                selectActivity();
            }

            if(Activity === 1) {
                MachineWorkout();
            }

            textSize(25);
            text("Version: "+msg,400,1185);


        }




}
};

    // Get the canvas that Processing-js will use
    var canvas = document.getElementById("mycanvas"); 
    // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
    var processingInstance = new Processing(canvas, Testing); 