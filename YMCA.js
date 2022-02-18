var Testing = function(processingInstance) {
    with (processingInstance) {

        size(800,1200); 
        frameRate(30);
        
        // ProgramCodeGoesHere

         var msg= "02.18.22/13:30";       

         var FirstColor = color(0, 0, 0);
         var SecondColor = color(135,10,10);
         var ThirdColor = color(70,50,168);
         var BoxColor = color(255,255,255);
         var SelectBoxColor = color(0,255,200);
         var BackColor = color(180,200,240);
         stroke(FirstColor);
         strokeWeight(2);

         const Machine = ["1","2","3","4","5","6","7","8","9","10","11","12 F","12 RD","13 AB","13 AD"];
         const MachineDesc = ["Leg Press","2","3","Chess Press","Overhead Press","Arm Curl","Arm Extension","Row","9","Leg Extension","Seated Leg Curl","Pectoral Fly","Rear Deltoids","Hip Adduction","Hip Abduction"]
         const MachineWeight = [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50];
         const MachineReps = [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15];
         const MachineSets = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3];
         const MachineComplete = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
         var Current = 0;
         var Activity = 0;
         var chkWeight = 0;

         

            window.localStorage.setItem('MW',JSON.stringify(MachineWeight));
            window.localStorage.setItem('MR',JSON.stringify(MachineReps));
            window.localStorage.setItem('MS',JSON.stringify(MachineSets));

        selectActivity = function() {
            if(chkWeight===0) {
                chkWeight = 1;
                if(window.localStorage.getItem('MW')!=null) {
                    var MW1 =JSON.parse(window.localStorage.getItem('MW'));
                    var MR1 =JSON.parse(window.localStorage.getItem('MR'));
                    var MS1 =JSON.parse(window.localStorage.getItem('MS'));
                    for (i=0; i<15; i++) {
                        MachineWeight[i]=Number(MW1[i]);
                        MachineReps[i]=Number(MR1[i]);
                        MachineSets[i]=Number(MS1[i]);
                    }
                }
            }
            background(BackColor);
            textSize(50);
            textAlign(CENTER);
            fill(BoxColor);
            rect(100,20,600,70);
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
            fill(FirstColor);
            text("Clear Workout Session",400,520);
            text("Clear Weights, Reps, Sets",400,670);
        }


//      INDIVIDUAL MACHINE WORKOUT
        MachineWorkout = function() {          
            background(BackColor);
            fill(BoxColor);


            rect(100,100,200,100);
            rect(200,450,300,100);
            fill(BackColor);
            rect(400,100,200,100);
            textSize(40);
            textAlign(CENTER);
            fill(FirstColor);
            text("Interval: "+startTrack,600,50);
            text("Set Point",200,170);
            text("Current",500,170);
            text("Main Menu",350,520);
            text("Lat  ="+Lat1.toFixed(3),200,250);
            text("Long ="+Long1.toFixed(3),200,300);
            text("Lat  ="+Lat2.toFixed(3),500,250);
            text("Long ="+Long2.toFixed(3),500,300);
            text(dist.toFixed(0)+" Yards",350,350);
            text((dist*3).toFixed(0)+" Feet",350,400);
        }

        areaActivity = function() {
//      Area Calculation
            background(BackColor);
            fill(BoxColor);
            rect(200,100,300,100);
            rect(200,300,300,100);
            rect(200,500,300,100);
            textSize(40);
            textAlign(CENTER);
            fill(FirstColor);
//            text(chkLoc+" "+mouseX+" "+mouseY,600,120);
//            text(Area.toFixed(0),600,170);
            if (Area===0) {
                text("Set Point #"+(Count+1),350,170);
                text(Lat2.toFixed(6)+", "+Long2.toFixed(6),350,250);
                if(Count>2) {
                    Lat1=areaLat[Count-1];
                    Long1=areaLong[Count-1];
                    distance()
//                    console.log("Lat1, Long1, Count",Lat1,Long1,Count);
                    text((dist*3).toFixed(0)+"ft from Point #"+Count,350,295);
                }
            }
            else {
                text("Start New Area",350,170);    
            }
            if (Area != 0) {
                text("Add More Pts",350,370);
            } else {
                text("Calculate Area",350,370);
            }
            if (Area != 0) {
                text("Area: "+sfArea.toFixed(0)+" sq ft  /  "+acresArea.toFixed(3)+" acres",350,440);
            }
            text("Main Menu",350,570);
            if(Count>1) {
                mapIt();
            }
        }

        calcArea = function() {

            if (Count > 2) {
                console.log("Here at calcArea",Count,areaLat[Count-1],areaLong[Count-1]);
                areaLat.push(areaLat[0]);
                areaLong.push(areaLong[0]); 
                for (var i = 0; i < Count; i++) {
                    Area = Area + ( R*(areaLong[i+1] - areaLong[i]) * (2 + Math.sin(areaLat[i]*R) + Math.sin(areaLat[i+1]*R)) );
                }
//          Calculate area in square meters
                Area = Area * 6378137 * 6378137/ 2;
//          Calculate area in square feet
                sfArea = Area * 10.763915;
//          Calculate area in acres
                acresArea = sfArea / 43560 ;
                console.log(Area,sfArea,acresArea);
            }
        }

        velocityActivity = function(){
//      Velocity Calculation
            background(BackColor);
            fill(BoxColor);
            for (i = 0; i < 5; i++) {
                if(i===speedType) {
                    fill(SelectBoxColor);
                } else {
                    fill(BoxColor);        
                }
                rect(100+i*100,15,100,50);
            }
            fill(BoxColor);
            rect(200,100,300,100);
//            rect(200,300,300,100);
            rect(200,500,300,100);
            textSize(30);
            textAlign(CENTER);
            fill(FirstColor);
            text("ft/sec",150,50);
            text("ft/min",250,50);
            text("mi/hr",350,50);
            text("m/sec",450,50);
            text("km/hr",550,50);
            textSize(40);
            text("Start",350,170);
            text("Total Distance:"+(totalDistance*convertDistance[speedType]).toFixed(3)+distLabel[speedType],350,270);
            text("Avg Speed: "+(totalSpeed*convertSpeed[speedType]).toFixed(3)+speedLabel[speedType],350,320)
            if(Count===9 && flashDistance>0) {
                text("5-sec Distance: "+flashDistance.toFixed(3)+distLabel[speedType],350,400);
                text("5-sec Speed: "+flashSpeed.toFixed(3)+speedLabel[speedType],350,450);
            }
            text("Main Menu",350,570);

        }

        mapIt = function() {
            minLat = 1000;
            minLong = 1000;
            maxLat = -1000;
            maxLong = -1000;
            for(i=0; i<Count; i++) {
//                console.log("Count, Lat, Long ",i,areaLat[i],areaLong[i]);
                if(areaLat[i]<minLat) {
                    minLat=areaLat[i];
                }
                if(areaLong[i]<minLong) {
                    minLong=areaLong[i];
                }
                if(areaLat[i]>maxLat) {
                    maxLat=areaLat[i];
                }
                if(areaLong[i]>maxLong) {
                    maxLong=areaLong[i];
                }
            }
//            console.log(minLat,maxLat,minLong,maxLong,lenLat,lenLong);
            lenLat = maxLat - minLat;
            lenLong = maxLong - minLong;
            maxLat = maxLat + 0.05 * lenLat;
            minLat = minLat - 0.05 * lenLat;
            maxLong = maxLong + 0.05 * lenLong;
            minLong = minLong - 0.05 * lenLong;
            lenLat = maxLat - minLat;
            lenLong = maxLong - minLong;
            ULx = 100;
            ULy = 600;
            Lx = 500;
            Ly = 500;
            fill(BoxColor);
            rect(ULx,ULy,Lx,Ly);
            fill(FirstColor);
            for(i=1; i<Count; i++) {
                x1 = ULx+(areaLong[i-1]-minLong)*(Lx/lenLong);
                y1 = ULy+Ly-(areaLat[i-1]-minLat)*(Ly/lenLat);
                x2 = ULx+(areaLong[i]-minLong)*(Lx/lenLong);
                y2 = ULy+Ly-(areaLat[i]-minLat)*(Ly/lenLat);
                line(x1,y1,x2,y2);
                console.log("x1,y1,x2,y2 ",x1,y1,x2,y2);
            }
        }

        mouseClicked = function() {

            if(Activity === 0) {

                for (i=0; i<5; i++) {
                    for (j=0; j<3; j++) {
                        if(mouseX>=25+i*150 && mouseX<175+i*150 && mouseY>=100+j*100 && mouseY<200+j*100) {
                            Current = 1+i+j*5;
                            Activity = 1;
                        }
                    }
                }
                if(mouseX>=100 && mouseX<700 && mouseY>=450 && mouseY<550) {
                    for (i=0; i<15; i++) {
                        MachineComplete[i] = 0;
                    }
                }
                if(mouseX>=100 && mouseX<700 && mouseY>=600 && mouseY<700) {
                    window.localStorage.removeItem('MW'); 
                    window.localStorage.removeItem('MR');
                    window.localStorage.removeItem('MS');                    
                    for (i=0; i<15; i++) {
                        MachineWeight[i]=50;
                        MachineReps[i]=15;
                        MachineSets[i]=3;
                    }
                }

            }

//          MACHINE WEIGHT SELECTION

            if(Activity===1 && mouseX>=100 && mouseX<=300 && mouseY>=100 && mouseY<=200) {
                getLocation();
                setInterval(trackLocation,500);
                startTrack=0;
            }            

            if(Activity===1 && mouseX>=200 && mouseX<=500 && mouseY>=450 && mouseY<=550) {
                Activity = 0;
                clearInterval(trackLocation);
            }            


//          AREA CALCULATOR

            if(Activity===2 && mouseX>=200 && mouseX<=500 && mouseY>=100 && mouseY<=200) {
                if (Area != 0) {
                console.log("Area Test 1",Area,Count);
                    Area=0;
                    sfArea=0;
                    areaLat.splice(0, areaLat.length);
                    areaLong.splice(0, areaLong.length);
                    Count = 0;
                    chkLoc = 1;
                } else {
                console.log("Area Test 2",Area,Count);
                    getLocation();
                    chkLoc = 2;
                }
            }            

            if(Activity===2 && mouseX>=200 && mouseX<=500 && mouseY>=300 && mouseY<=400) {
                if(Area != 0) {
                console.log("Area Test 3",Area,Count);
                    Area = 0;
                    sfArea = 0;
                    chkLoc = 3;
                } else {
                    calcArea();
                console.log("Area Test 4",Area,Count);
                    chkLoc = 4;
                }
            }            
            if(Activity===2 && mouseX>=200 && mouseX<=500 && mouseY>=500 && mouseY<=600) {
                Activity = 0;
                clearInterval(trackLocation);
            }            

//          VELOCITY CALCULATOR

            if(Activity===3) {
                for (i = 0; i < 5; i++) {
                    if(mouseX>=100+100*i && mouseX<=200+100*i && mouseY>=15 && mouseY<=65) {
                        speedType=i;
                    }
                }
                if(mouseX>=200 && mouseX<=500 && mouseY>=100 && mouseY<=200) {
                    Count=0;
                    totalSpeed = 0;
                    totalDistance = 0;
                    flashSpeed = 0;
                    flashDistance = 0;
                    startTrack = 0; 
                    speedDist = [];
                    speedType = 1;
                    getlocation();
                    getLocation()
                }            
                if(mouseX>=200 && mouseX<=500 && mouseY>=500 && mouseY<=600) {
                    Activity = 0;
                    clearInterval(trackLocation);
                }            
                
            }            


        }

        var Area=0
        var sfArea = 0;
        var acresArea = 0;
        var Activity = 0;
        var Count=0;
        draw = function() {
            if(Activity === 0) {
                selectActivity();
            }

            if(Activity === 1) {
                MachineWorkout();
            }

            if(Activity === 2) {
                areaActivity();
            }

            if(Activity === 3) {
                velocityActivity();
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