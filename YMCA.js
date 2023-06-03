var Testing = function(processingInstance) {
    with (processingInstance) {

        size(800,1200); 
        frameRate(30);
        
        // ProgramCodeGoesHere

         var msg= "06.03.23/15:00";       

         var FirstColor = color(0, 0, 0);
         var SecondColor = color(135,10,10);
         var ThirdColor = color(70,50,168);
         var BoxColor = color(255,255,255);
         var SelectBoxColor = color(0,255,200);
         var ConfirmBoxColor = color(255,255,0)
         var WarningColor = color(255,0,0);
         var BackColor = color(180,200,240);
         stroke(FirstColor);
         strokeWeight(2);

         const Machine = ["1","2","3","4 AB","4 AD","5 Fly","5 Delt","6","7","8","9","10","11","12","13","14"];
         const MachineDesc = ["#1 Leg Press/Toe Lift","#2 Leg Extension","#3 Prone Leg Curl","#4 Hip Abduction","#4 Hip Adduction","#5 Pectoral Fly","#5 Rear Deltoids","#6 Chest Press","#7 Pull Down","#8 Overhead Press","#9 Row","#10 Arm Curl","#11 Arm Extension","#12 Back Extension","#13 Abdominal","#14 Torso Extension"]
         const MachineWeight = [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50];
         const MachineReps = [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15];
         const MachineSets = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3];
         const MachineComplete = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
         var AreYouSure = 0;
         var Current = 0;
         var Activity = -1;
         var chkWeight = 0;
         var SelectedMachine="";
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
         

//      CONTINUE EXISTING SESSION OR START NEW SESSION Activity = -1
        oldORnew = function() {
            background(BackColor);
            textSize(45);
            textAlign(CENTER);
            fill(SelectBoxColor);
            rect(100,100,600,100);
            rect(100,400,600,100);
            fill(SecondColor);
            text("Continue Previous Workout",400,170);
            text("Begin New Workout Session",400,470);
        }


//      SELECT MACHINE FOR USE Activity = 0
        selectActivity = function() {
            if(chkWeight===0) {
                chkWeight = 1;
                if(window.localStorage.getItem('MW')!=null) {
                    var MW1 = JSON.parse(window.localStorage.getItem('MW'));
                    var MR1 = JSON.parse(window.localStorage.getItem('MR'));
                    var MS1 = JSON.parse(window.localStorage.getItem('MS'));
                    var MC1 = JSON.parse(window.localStorage.getItem('MC'));
                    for (i=0; i<17; i++) {
                        MachineWeight[i]=Number(MW1[i]);
                        MachineReps[i]=Number(MR1[i]);
                        MachineSets[i]=Number(MS1[i]);
                        MachineComplete[i]=Number(MC1[i]);
                    }
                }
            }
            background(BackColor);
            textSize(50);
            textAlign(CENTER);
            fill(SelectBoxColor);
            rect(50,20,700,70);
            fill(SecondColor);
            if(SelectedMachine==="") {
                text("SELECT CYBEX STATION",400,75)
            } else {
                fill(ConfirmBoxColor);
                rect(50,20,700,70);
                fill(SecondColor);
                text("Confirm: "+SelectedMachine,400,75)
            }

            for (i=0; i<4; i++) {
                for (j=0; j<4; j++) {
                    if (MachineComplete[i+j*4] === 1) {
                        fill(SelectBoxColor);
                        rect(25+i*185,100+j*100,185,100);
                        fill(FirstColor);
                        text(Machine[i+j*4],100+i*185,170+j*100)
                    } else {
                        fill(BoxColor);
                        rect(25+i*185,100+j*100,185,100);
                        fill(FirstColor);
                        text(Machine[i+j*4],120+i*185,170+j*100)
                    }
                }
            }
            fill(BoxColor);
            rect(100,550,600,100);
            rect(100,700,600,100);
            if(AreYouSure===1) {
                fill(WarningColor);
                rect(100,850,600,100);
                fill(BoxColor);
                rect(200,1000,400,100);            
            }
            fill(FirstColor);
            text("Clear Workout Session",400,620);
            text("Clear Weights, Reps, Sets",400,770);
            if(AreYouSure===1) {
                text("Confirm Deletion of",400,890);            
                text("Weights, Reps & Sets Info",400,940);
                text("Cancel Deletion",400,1070);
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

            if(Activity === -1) {
                if(mouseX>=100 && mouseX<=700 && mouseY>=100 && mouseY<=200) {

                }
                if(mouseX>=100 && mouseX<=700 && mouseY>=400 && mouseY<=500) {
                    for (i=0; i<16; i++) {
                        MachineComplete[i] = 0;
                    }
                    window.localStorage.setItem('MC',JSON.stringify(MachineComplete));
                }
                Activity = 0;
                return;
            }


            if(Activity === 0) {

                for (i=0; i<4; i++) {
                    for (j=0; j<4; j++) {
                        if(mouseX>=25+i*185 && mouseX<=210+i*185 && mouseY>=100+j*100 && mouseY<=200+j*100) {
                            Current = i+j*4;
                            MWc = MachineWeight[Current];
                            MRc = MachineReps[Current];
                            MSc = MachineSets[Current];
                            SelectedMachine = MachineDesc[Current];
//                            Activity = 1;
                            if(MWc<16) {
                                MWm = 5;
                                MWp = (MWc-MWm+5)/5;
                            } else {
                                MWm = MWc-10;
                                MWp = 3;
                            }
                            if(MRc<16) {
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
                if(mouseX>=50 && mouseX<=700 && mouseY>=20 && mouseY<=70) {
                    Activity=1;
                }
                if(mouseX>=100 && mouseX<=700 && mouseY>=550 && mouseY<=650) {
                    for (i=0; i<15; i++) {
                        MachineComplete[i] = 0;
                    }
                    SelectedMachine="";
                }
                if(mouseX>=100 && mouseX<=700 && mouseY>=700 && mouseY<=800) {
                    AreYouSure = 1;
                }
                if(mouseX>=100 && mouseX<=700 && mouseY>=850 && mouseY<=950) {
                    window.localStorage.removeItem('MW'); 
                    window.localStorage.removeItem('MR');
                    window.localStorage.removeItem('MS');
                    window.localStorage.removeItem('MC');                    
                    for (i=0; i<16; i++) {
                        MachineWeight[i]=50;
                        MachineReps[i]=15;
                        MachineSets[i]=3;
                        MachineComplete[i]=0;
                    }
                    AreYouSure = 0;
                }
                if(mouseX>=200 && mouseX<=600 && mouseY>=1000 && mouseY<=1100) {
                    AreYouSure = 0;
                }
                return;

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

                            if(MWc<16) {
                                MWm = 5;
                                MWp = (MWc-MWm+5)/5;
                            } else {
                                MWm = MWc-10;
                                MWp = 3;
                            }
                            if(MRc<16) {
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
                            window.localStorage.setItem('MC',JSON.stringify(MachineComplete));

                            return;
                        }
                    }
                }
                if(mouseX>=100 && mouseX<=700 && mouseY>=800 && mouseY<=900) {
                    MachineComplete[Current] = 1;
                    window.localStorage.setItem('MC',JSON.stringify(MachineComplete));
                    Activity = 0;
                    SelectedMachine="";
                }
                if(mouseX>=100 && mouseX<=700 && mouseY>=950 && mouseY<=1050) {
                    Activity = 0;
                    SelectedMachine="";
                }

            }


        }

        draw = function() {

            if(Activity === -1) {
                oldORnew();
            }

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