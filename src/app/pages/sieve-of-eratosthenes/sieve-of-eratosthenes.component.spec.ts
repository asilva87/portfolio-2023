import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SieveOfEratosthenesComponent } from './sieve-of-eratosthenes.component'

describe('SieveOfEratosthenesComponent', () => {
	let component: SieveOfEratosthenesComponent
	let fixture: ComponentFixture<SieveOfEratosthenesComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SieveOfEratosthenesComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(SieveOfEratosthenesComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
