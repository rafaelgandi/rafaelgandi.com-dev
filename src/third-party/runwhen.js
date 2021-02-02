/* 
	Run When JS
		- Javascript code dependency checker	
	See: https://github.com/rafaelgandi/RunWhen
	LM: 2019-10-17
	Version: 1.0
 */
window.runwhen = (function (self) {
	const cachedChecks = {},
		TIMEOUT = 800,
		check = function (_checks) {
			let i = _checks.length;
			while (i--) {
				if (!! cachedChecks[_checks[i]]) { continue; } // Check cache, try to avoid eval()
				try {
					eval('if(typeof '+_checks[i]+' === \'undefined\'){throw \'e\';}');
					cachedChecks[_checks[i]] = !0;
				} 
				catch (e) { return !1; }	
			}	
			return !0;
		};
	return function (_checks, _run, _suppressTimeoutError) {	
		let CHECK_DURATION = 1,
			IS_FUNCTION_PASSED = typeof _checks === 'function';
		if (! IS_FUNCTION_PASSED) {
			if (! (_checks instanceof Array)) { _checks = [_checks]; } // Force _checks to be array	
		}
		(function loop () {
			let checking = (! IS_FUNCTION_PASSED) ? check(_checks) : _checks.call(self);
			if (checking) { _run.call(self); }
			else {
				// After 800 checks throw an exception //
				if (CHECK_DURATION > TIMEOUT) { 
					if (! _suppressTimeoutError) {
						throw 'RunWhen timeout reached';
					}					
					return; 
				}
				CHECK_DURATION++;
				setTimeout(loop, (1000 / 60));
			}			
		})();
	};
})(self);

export default runwhen;