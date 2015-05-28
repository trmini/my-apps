/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
"use strict";var __extends=this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);r.prototype=t.prototype,e.prototype=new r};define("vs/languages/typescript/js/importAndExportRewriter",["require","exports","vs/base/strings","vs/base/paths","vs/languages/typescript/lib/typescriptServices","vs/base/collections"],function(e,t,r,n,s,o){var i=function(){function e(e,t){this.offset=e,this.length=t}return e}();t.Node=i;var a=function(e){function t(){e.apply(this,arguments),this.items=[]}return __extends(t,e),t}(i);t.List=a;var l=function(e){function t(t,r,n){e.call(this,t,r),this.scope=n,this.requireStatements=[],this.exportsDotExpressions=[]}return __extends(t,e),t}(i);t.DefineNode=l;var c=function(e){function t(t,r,n){e.call(this,t,r),this.name=n}return __extends(t,e),t}(i);t.CallbackParameter=c;var u=function(e){function t(t,r,n){e.call(this,t,r),this.path=n}return __extends(t,e),t}(i);t.DependencyNode=u;var h=function(e){function t(t,r,n,s){e.call(this,t,r),this.name=n,this.path=s}return __extends(t,e),t}(i);t.RequireStatement=h;var p=function(e){function t(t,r,n){e.call(this,t,r),this.name=n}return __extends(t,e),t}(i);t.ExportsExpression=p;var d=function(e){function t(t,r){e.call(this,t,r)}return __extends(t,e),t}(i);t.GlobalExportsExpression=d;var m=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.computeEdits=function(e){e.newInsert("declare var exports:any; declare var module:any; declare var require:any;\n"),this._context=e,this._currentScopeId=0,this._currentNode=null,this._bucket=[],this._variableNames=new f,this._context.syntaxTree.sourceUnit().accept(this);for(var t=!1,r=0,n=this._bucket.length;n>r;r++){var s=this._bucket[r];s instanceof l&&!t&&0===s.scope?(this._translateDefineNode(s),t=!0):s instanceof d?this._translateGlobalExportsExpression(s):s instanceof p?this._translateExportsExpression(s):s instanceof h&&this._translateRequireStatement(s)}},Object.defineProperty(t.prototype,"nodes",{get:function(){return this._bucket},enumerable:!0,configurable:!0}),t.prototype._untilParent=function(e,t){for(var r=this._context.syntaxInfo.parent(e);r&&r.kind()!==t;)r=this._context.syntaxInfo.parent(r);return r},t.prototype._store=function(e){this._currentNode?e instanceof h?this._currentNode.requireStatements.push(e):e instanceof p&&this._currentNode.exportsDotExpressions.push(e):this._bucket.push(e)},t.prototype.visitBinaryExpression=function(t){var r;if(107===t.operatorToken.kind()&&149===this._context.syntaxInfo.parent(t).kind()){var n,s;if(g.isIdentifier(t.left,"exports"))n=this._context.syntaxInfo.start(t.left),s=this._context.syntaxInfo.end(t.left),r=new d(n,s-n);else if(212===t.left.kind()){var o=t.left,i=o.name.valueText();if(11===o.expression.kind()){var a=g.textValue(o.expression);"exports"===a?(n=this._context.syntaxInfo.start(o.expression),s=this._context.syntaxInfo.end(o.name),r=new p(n,s-n,i)):"module"===a&&"exports"===i&&(n=this._context.syntaxInfo.start(o.expression),s=this._context.syntaxInfo.end(o.name),r=new d(n,s-n))}else if(212===o.expression.kind()){var l=t.left.expression;g.isIdentifier(l.expression,"module")&&g.isIdentifier(l.name,"exports")&&(n=this._context.syntaxInfo.start(o.expression),s=this._context.syntaxInfo.end(o.name),r=new p(n,s-n,i))}}}return r?(this._store(r),void 0):e.prototype.visitBinaryExpression.call(this,t)},t.prototype.visitInvocationExpression=function(r){if(g.isIdentifier(r.expression,t._Require)){var n=r.argumentList.arguments;if(g.isPath(n,14)){var s,o=this._untilParent(r,225);return o&&(s=o.propertyName.text()),this._store(new h(this._context.syntaxInfo.start(r),r.width(),s,g.textValue(n.nonSeparatorAt(0)))),void 0}}else if(g.isIdentifier(r.expression,t._Define)){this._currentNode=new l(this._context.syntaxInfo.start(r),r.width(),this._currentScopeId);var n=r.argumentList.arguments;if(g.isPath(n,215)?this._currentNode.objectLiteral=new i(this._context.syntaxInfo.start(n.nonSeparatorAt(0)),n.nonSeparatorAt(0).width()):g.isPath(n,222)?this._fillInParametersAndBody(n.nonSeparatorAt(0),this._currentNode):g.isPath(n,214,222)?(this._fillInDependencies(n.nonSeparatorAt(0),this._currentNode),this._fillInParametersAndBody(n.nonSeparatorAt(1),this._currentNode)):g.isPath(n,14,214,222)?(this._currentNode.identifier=n.nonSeparatorAt(0).valueText(),this._fillInDependencies(n.nonSeparatorAt(1),this._currentNode),this._fillInParametersAndBody(n.nonSeparatorAt(2),this._currentNode)):this._currentNode=null,this._currentNode)return this._bucket.push(this._currentNode),e.prototype.visitInvocationExpression.call(this,r),this._currentNode=null,void 0}return e.prototype.visitInvocationExpression.call(this,r)},t.prototype._fillInDependencies=function(e,t){t.dependencyArray=new a(this._context.syntaxInfo.start(e),e.width());for(var r=0,n=e.expressions.nonSeparatorCount();n>r;r++){var s=e.expressions.nonSeparatorAt(r);t.dependencyArray.items.push(new u(this._context.syntaxInfo.start(s),s.width(),g.textValue(s)))}},t.prototype._fillInParametersAndBody=function(e,t){var r,n;r=this._context.syntaxInfo.end(e.callSignature.parameterList.openParenToken),n=this._context.syntaxInfo.start(e.callSignature.parameterList.closeParenToken),t.callbackParameters=new a(r,n-r);for(var s=e.callSignature.parameterList.parameters,o=0,l=s.nonSeparatorCount();l>o;o++){var u=s.nonSeparatorAt(o);t.callbackParameters.items.push(new c(this._context.syntaxInfo.start(u),u.width(),g.textValue(u)))}r=this._context.syntaxInfo.end(e.block.openBraceToken),n=this._context.syntaxInfo.start(e.block.closeBraceToken),t.callbackBody=new i(r,n-r)},t.prototype.visitNode=function(t){switch(t.kind()){case 129:case 222:case 218:case 219:this._currentScopeId+=1,e.prototype.visitNode.call(this,t),this._currentScopeId-=1;break;default:e.prototype.visitNode.call(this,t)}},t.prototype._translateRequireStatement=function(e){var t=this._variableNames.next(e.name||e.path);this._context.newInsert(r.format("import {0} = require({1});\n",t,e.path)),this._context.newReplace(e.offset,e.length,t)},t.prototype._translateGlobalExportsExpression=function(e){var t=this._variableNames.next();this._context.newReplace(e.offset,e.length,r.format("var {0}",t)),this._context.newAppend(r.format("\nexport = {0};",t))},t.prototype._translateExportsExpression=function(e){this._context.newReplace(e.offset,e.length-e.name.length,"export var ")},t.prototype._translateDefineNode=function(e){if(e.objectLiteral)this._context.newInsert(t._DeclareWithLiteral);else{if(e.dependencyArray)for(var n=0,s=e.callbackParameters.items.length;s>n;n++){var o=e.callbackParameters.items[n],i=e.dependencyArray.items[n];if(!t._SpecialCallbackParams.hasOwnProperty(o.name)&&i){var a=this._variableNames.next();this._context.newInsert(r.format("import {0} = require({1});\n",a,i.path)),this._context.newInsert(o.offset+o.length,r.format(":typeof {0}",a))}}for(var l=[],n=0,s=e.requireStatements.length;s>n;n++){var c=e.requireStatements[n],u=this._variableNames.next(),h=this._variableNames.next();this._context.newInsert(r.format("import {0} = require({1});\n",u,c.path)),this._context.newReplace(c.offset,c.length,h),l.push(r.format("{0}:typeof {1}",h,u))}l.length>0&&this._context.newInsert(e.callbackParameters.offset+e.callbackParameters.length,r.format("{0}{1}",e.callbackParameters.items.length>0?",":"",l.join(",")));for(var p=[],n=0,s=e.exportsDotExpressions.length;s>n;n++){var d=e.exportsDotExpressions[n],m=this._variableNames.next();this._context.newReplace(d.offset,d.length,r.format("var {0}",m)),p.push(d.name),p.push(":"),p.push(m),p.push(",")}p.length>0&&(p.pop(),this._context.newInsert(e.callbackBody.offset+e.callbackBody.length,r.format("return {{0}};",p.join(r.empty))));var g=e.identifier?"id,":r.empty,f=e.dependencyArray?"dep,":r.empty,v=e.callbackParameters.items.map(function(e){return e.name}).concat(e.requireStatements.map(function(e,t){return r.format("_p{0}",t)})).join(",");this._context.newInsert(r.format(t._DeclareTemplate,g,f,v))}var b=this._variableNames.next();this._context.newInsert(e.offset,r.format("var {0} = ",b)),this._context.newAppend(r.format("\nexport = {0};",b))},t._SpecialCallbackParams={exports:!0,module:!0,require:!0},t._DeclareWithLiteral="declare function define<T>(literal:T):T;\n",t._DeclareTemplate="declare function define<T>({0}{1}callback:({2})=>T):T;\n",t._Define="define",t._Require="require",t}(s.SyntaxWalker);t.ImportsAndExportsCollector=m;var g,f=function(){function e(){this._counter=0,this._proposalToName={},this._allNames={}}return e.prototype.next=function(t){if(!t)return r.format("_var_{0}",this._counter++);var s=o.lookup(this._proposalToName,t);if(s)return s;if(s=t.replace(/["']/g,r.empty),s=n.basename(s),s=s.replace(e._RegExp,r.empty),0===s.length)return this.next();s=s.split(r.empty).join(e._SpecialChar),s+=e._SpecialChar;for(var i=s,a=1;o.contains(this._allNames,s);a++)s=i+a;return this._allNames[s]=!0,this._proposalToName[t]=s,s},e.prototype.allocateIfFree=function(e){return o.contains(this._allNames,e)?!1:(this._allNames[e]=!0,!0)},e.prototype.reset=function(){this._counter=0,this._proposalToName={},this._allNames={}},e._RegExp=/[^A-Za-z_$]/g,e._SpecialChar="̲",e}();!function(e){function t(e){for(var t=[],r=0;r<arguments.length-1;r++)t[r]=arguments[r+1];if(t.length!==e.nonSeparatorCount())return!1;for(var n=0,s=t.length;s>n;n++)if(e.nonSeparatorAt(n).kind()!==t[n])return!1;return!0}function r(e,t){return 11!==e.kind()?!1:n(e)===t}function n(e){var t=e.leadingTriviaWidth(),r=e.trailingTriviaWidth(),n=e.fullText();return n.substring(t,n.length-r)}function s(e,t,r){return t&&r?e.fullWidth():e.width()+(t?e.leadingTriviaWidth():0)+(r?e.trailingTriviaWidth():0)}e.isPath=t,e.isIdentifier=r,e.textValue=n,e.width=s}(g||(g={}))});