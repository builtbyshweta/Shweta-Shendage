(function () {
    var KEY = "todo.tasks.v1";
    var tasks = [], filter = "all";
    var form = document.getElementById("form"), input = document.getElementById("input"),
        list = document.getElementById("list"), empty = document.getElementById("empty"),
        count = document.getElementById("count"), bar = document.getElementById("bar"),
        sub = document.getElementById("sub"), clearBtn = document.getElementById("clear");

    function load() {
        try {
            var raw = localStorage.getItem(KEY);
            var data = raw ? JSON.parse(raw) : [];
            if (Array.isArray(data)) tasks = data;
        } catch (e) { tasks = []; }
    }
    function save() {
        try { localStorage.setItem(KEY, JSON.stringify(tasks)); } catch (e) { }
    }

    function render() {
        list.innerHTML = "";
        var shown = tasks.filter(function (t) {
            return filter === "all" || (filter === "done" ? t.done : !t.done);
        });
        shown.forEach(function (t) {
            var li = document.createElement("li");
            if (t.done) li.className = "done";

            var chk = document.createElement("button");
            chk.className = "check"; chk.type = "button";
            chk.textContent = "✓";
            chk.setAttribute("aria-label", (t.done ? "Mark as to do: " : "Mark as done: ") + t.text);
            chk.addEventListener("click", function () { t.done = !t.done; save(); render(); });

            var span = document.createElement("span");
            span.className = "text"; span.textContent = t.text;

            var del = document.createElement("button");
            del.className = "del"; del.type = "button"; del.textContent = "×";
            del.setAttribute("aria-label", "Delete task: " + t.text);
            del.addEventListener("click", function () {
                tasks = tasks.filter(function (x) { return x.id !== t.id; });
                save(); render();
            });

            li.appendChild(chk); li.appendChild(span); li.appendChild(del);
            list.appendChild(li);
        });

        var total = tasks.length, done = tasks.filter(function (t) { return t.done; }).length;
        empty.hidden = shown.length > 0;
        empty.textContent = total === 0 ? "No tasks yet. Add your first one above."
            : filter === "done" ? "Nothing completed yet." : "All caught up. Nice work.";
        bar.style.width = total ? Math.round(done / total * 100) + "%" : "0%";
        count.textContent = (total - done) + " left";
        sub.textContent = total ? done + " of " + total + " completed" : "Plan your day, one task at a time.";
        clearBtn.hidden = done === 0;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var text = input.value.trim();
        if (!text) { input.focus(); return; }
        tasks.unshift({ id: Date.now() + Math.random(), text: text, done: false });
        input.value = "";
        save(); render();
        input.focus();
    });

    document.querySelectorAll(".filters button").forEach(function (b) {
        b.addEventListener("click", function () {
            filter = b.dataset.f;
            document.querySelectorAll(".filters button").forEach(function (x) {
                x.setAttribute("aria-pressed", x === b ? "true" : "false");
            });
            render();
        });
    });

    clearBtn.addEventListener("click", function () {
        tasks = tasks.filter(function (t) { return !t.done; });
        save(); render();
    });

    load(); render();
})();
