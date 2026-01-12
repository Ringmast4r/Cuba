/*
 * asljQuery Easing v1.3 - http://gsgd.co.uk/sandbox/asljQuery/easing/
 *
 * Uses the built in easing capabilities added In asljQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - asljQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('e(T(g)==\'q\'){g=12}g.i[\'1d\']=g.i[\'y\'];g.11(g.i,{z:\'A\',y:9(x,t,b,c,d){6 g.i[g.i.z](x,t,b,c,d)},15:9(x,t,b,c,d){6 c*(t/=d)*t+b},A:9(x,t,b,c,d){6-c*(t/=d)*(t-2)+b},1c:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t+b;6-c/2*((--t)*(t-2)-1)+b},1a:9(x,t,b,c,d){6 c*(t/=d)*t*t+b},19:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t+1)+b},17:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t+b;6 c/2*((t-=2)*t*t+2)+b},18:9(x,t,b,c,d){6 c*(t/=d)*t*t*t+b},V:9(x,t,b,c,d){6-c*((t=t/d-1)*t*t*t-1)+b},U:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t+b;6-c/2*((t-=2)*t*t*t-2)+b},16:9(x,t,b,c,d){6 c*(t/=d)*t*t*t*t+b},P:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t*t*t+1)+b},O:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t*t+b;6 c/2*((t-=2)*t*t*t*t+2)+b},N:9(x,t,b,c,d){6-c*8.B(t/d*(8.h/2))+c+b},Q:9(x,t,b,c,d){6 c*8.n(t/d*(8.h/2))+b},R:9(x,t,b,c,d){6-c/2*(8.B(8.h*t/d)-1)+b},S:9(x,t,b,c,d){6(t==0)?b:c*8.j(2,10*(t/d-1))+b},M:9(x,t,b,c,d){6(t==d)?b+c:c*(-8.j(2,-10*t/d)+1)+b},L:9(x,t,b,c,d){e(t==0)6 b;e(t==d)6 b+c;e((t/=d/2)<1)6 c/2*8.j(2,10*(t-1))+b;6 c/2*(-8.j(2,-10*--t)+2)+b},G:9(x,t,b,c,d){6-c*(8.r(1-(t/=d)*t)-1)+b},F:9(x,t,b,c,d){6 c*8.r(1-(t=t/d-1)*t)+b},E:9(x,t,b,c,d){e((t/=d/2)<1)6-c/2*(8.r(1-t*t)-1)+b;6 c/2*(8.r(1-(t-=2)*t)+1)+b},I:9(x,t,b,c,d){f s=1.m;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}l f s=p/(2*8.h)*8.u(c/a);6-(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.h)/p))+b},K:9(x,t,b,c,d){f s=1.m;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}l f s=p/(2*8.h)*8.u(c/a);6 a*8.j(2,-10*t)*8.n((t*d-s)*(2*8.h)/p)+c+b},J:9(x,t,b,c,d){f s=1.m;f p=0;f a=c;e(t==0)6 b;e((t/=d/2)==2)6 b+c;e(!p)p=d*(.3*1.5);e(a<8.w(c)){a=c;f s=p/4}l f s=p/(2*8.h)*8.u(c/a);e(t<1)6-.5*(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.h)/p))+b;6 a*8.j(2,-10*(t-=1))*8.n((t*d-s)*(2*8.h)/p)*.5+c+b},X:9(x,t,b,c,d,s){e(s==q)s=1.m;6 c*(t/=d)*t*((s+1)*t-s)+b},W:9(x,t,b,c,d,s){e(s==q)s=1.m;6 c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},Z:9(x,t,b,c,d,s){e(s==q)s=1.m;e((t/=d/2)<1)6 c/2*(t*t*(((s*=(1.C))+1)*t-s))+b;6 c/2*((t-=2)*t*(((s*=(1.C))+1)*t+s)+2)+b},D:9(x,t,b,c,d){6 c-g.i.v(x,d-t,0,c,d)+b},v:9(x,t,b,c,d){e((t/=d)<(1/2.k)){6 c*(7.o*t*t)+b}l e(t<(2/2.k)){6 c*(7.o*(t-=(1.5/2.k))*t+.k)+b}l e(t<(2.5/2.k)){6 c*(7.o*(t-=(2.Y/2.k))*t+.14)+b}l{6 c*(7.o*(t-=(2.H/2.k))*t+.1b)+b}},13:9(x,t,b,c,d){e(t<d/2)6 g.i.D(x,t*2,0,c,d)*.5+b;6 g.i.v(x,t*2-d,0,c,d)*.5+c*.5+b}});',62,76,'||||||return||Math|function|||||if|var|asljQuery|PI|easing|pow|75|else|70158|sin|5625||undefined|sqrt|||asin|easeOutBounce|abs||swing|def|easeOutQuad|cos|525|easeInBounce|easeInOutCirc|easeOutCirc|easeInCirc|625|easeInElastic|easeInOutElastic|easeOutElastic|easeInOutExpo|easeOutExpo|easeInSine|easeInOutQuint|easeOutQuint|easeOutSine|easeInOutSine|easeInExpo|typeof|easeInOutQuart|easeOutQuart|easeOutBack|easeInBack|25|easeInOutBack||extend|jQuery|easeInOutBounce|9375|easeInQuad|easeInQuint|easeInOutCubic|easeInQuart|easeOutCubic|easeInCubic|984375|easeInOutQuad|jswing'.split('|'),0,{}))


/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */