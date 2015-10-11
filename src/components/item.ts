/// <reference path="../../typings/angular2/angular2.d.ts" />

import { Component, View } from "angular2/angular2";

@Component({
	selector : "item"
})
@View({
	directives: [],
	template: `<div class="center">
		<img src='https://angular.io/resources/images/logos/standard/shield-large.png'>
		<h1>Zdravo svete! <a href="#/">Home view</a>!</h1>
	</div>`
})

export class ItemComponent {}