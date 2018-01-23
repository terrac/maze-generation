var maze1 =(x,y)=> {
	var n=x*y-1;
	if (n<0) {alert("illegal maze dimensions");return;}
	var horiz =[]; 
	for (var j= 0; j<x+1; j++) 
	  horiz[j]= [];
	var verti =[]; 
	for (var j= 0; j<x+1; j++) 
	  verti[j]= []
	var here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)]
	var path = [here]
	var unvisited = [];
	for (var j = 0; j<x+2; j++) {
		unvisited[j] = [];
		for (var k= 0; k<y+1; k++)
			unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
	}
	while (0<n) {
		var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
		    [here[0]-1, here[1]], [here[0],here[1]-1]];
		var neighbors = [];
		for (var j = 0; j < 4; j++)
			if (unvisited[potential[j][0]+1][potential[j][1]+1])
				neighbors.push(potential[j]);
		if (neighbors.length) {
			n = n-1;
			var next= neighbors[Math.floor(Math.random()*neighbors.length)];
			unvisited[next[0]+1][next[1]+1]= false;
			if (next[0] == here[0])
				horiz[next[0]][(next[1]+here[1]-1)/2]= true;
			else 
				verti[(next[0]+here[0]-1)/2][next[1]]= true;
			path.push(here = next);
		} else 
			here = path.pop();
	}
	return {x: x, y: y, horiz: horiz, verti: verti};
}
var displayProc1=(m,dispFun)=>{
  
	var text= [];
	for (var j= 0; j<m.x*2+1; j++) {
		//var line= [];
		if (0 == j%2)
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4) 
					dispFun(j,k,1)
				else
					if (j>0 && m.verti[j/2-1][Math.floor(k/4)])
						dispFun(j,k,0)
					else
						dispFun(j,k,1)
		else
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4)
					if (k>0 && m.horiz[(j-1)/2][k/4-1])
						dispFun(j,k,0)
					else
						dispFun(j,k,1)
				else
					dispFun(j,k,0);
		//if (0 == j) line[1]= line[2]= line[3]= ' ';
		//if (m.x*2-1 == j) line[4*m.y]= ' ';
		//text.push(line.join('')+'\r\n');
	}
	//return text.join('');
}
var dispFun = (j,k,isBlock)=>{
    var addEnemy = .3 < Math.random()
    var o = false
    if(addEnemy)
      o = "addEnemy"
    if(isBlock)
      gL.setBlock("grass",j,11,k)
    else
      gL.setBlock(o,j,11,k)
}
displayProc1(maze1(3,3),dispFun)
