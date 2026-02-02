<?php

namespace App\Http\Controllers;

use App\Http\Requests\Account\StoreRequest;
use App\Http\Requests\Account\UpdateRequest;
use App\Models\Account;
use App\Models\Month;
use App\Models\Year;
use Carbon\Carbon;
use Illuminate\Auth\Access\Response;
use Illuminate\Http\Request;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class AccountController extends Controller
{
    public function get(Request $request)
    {
        $limit = $request->limit;
        $query = Account::query();

        $query->when($request->search, function ($q) use ($request) {
            return $q->where("title", "like", "%" . $request->search . "%")
                ->orWhere("price", "like", "%" . $request->search . "%");
        });

        $accounts = $query->where('user_id', $request->user_id)->latest()->limit($limit)->get();
        $total_length = $query->count();

        return Response([
            'accounts' => $accounts,
            'limit' => $limit,
            'length' => $total_length
        ]);
    }
    public function collect($user_id)
    {
        return Account::where('user_id', $user_id)
            ->where('type', 'collect')
            ->sum('price');
    }
    public function expense($user_id)
    {
        return Account::where('user_id', $user_id)
            ->where('type', 'expense')
            ->sum('price');
    }
    public function store(StoreRequest $request)
    {
        $month_name = date("M", strtotime($request->date));
        $year_name = date("Y", strtotime($request->date));
        $month = Month::where('name', $month_name)->first();
        $year = Year::where('name', $year_name)->first();

        // 2024-05-29 01:49:45
        // $request->validate([
        // ], [
        //     'title.required' => 'Title Required',
        // ]);
        $account = new Account();
        $account->user_id = $request->user_id;
        $account->title = $request->title;
        $account->amount = $request->amount;
        $account->price = $request->price;
        $account->type = $request->type;
        $account->date_time = $request->date . " " . $request->time;
        if (isset($year)) {
            $account->year_id = $year->id;
        } else {
            $year = new Year();
            $year->name = $year_name;
            $year->save();

            $account->year_id = $year->id;
        }
        if (isset($month)) {
            $account->month_id = $month->id;
        } else {
            $month = new Month();
            $month->year_id = $year->id;
            $month->name = $month_name;
            $month->save();

            $account->month_id = $month->id;
        }
        $account->image = Account::fileStore($request->hasFile('image'), $request->file('image'), $request->file('image'), "");
        $account->save();

        if ($account->type === "collect") {
            $msg = "Collect Added!";
            return Response([
                'status' => 'collect_success',
                'msg' => $msg,
            ]);
        } else {
            $msg = "Expense Added!";
            return Response([
                'status' => 'expense_success',
                'msg' => $msg,
            ]);
        }
    }
    public function edit($id)
    {
        return Account::find($id);
    }
    public function update(UpdateRequest $request, $id)
    {
        $month_name = date("M", strtotime($request->date));
        $year_name = date("Y", strtotime($request->date));
        $month = Month::where('name', $month_name)->first();
        $year = Year::where('name', $year_name)->first();

        $account = Account::find($id);
        $account->title = $request->title;
        $account->amount = $request->amount;
        $account->price = $request->price;
        $account->type = $request->type;
        $account->date_time = $request->date . " " . $request->time;
        if (isset($year)) {
            $account->year_id = $year->id;
        } else {
            $year = new Year();
            $year->name = $year_name;
            $year->save();

            $account->year_id = $year->id;
        }
        if (isset($month)) {
            $account->month_id = $month->id;
        } else {
            $month = new Month();
            $month->year_id = $year->id;
            $month->name = $month_name;
            $month->save();

            $account->month_id = $month->id;
        }
        $account->image = Account::fileStore($request->hasFile('image'), $request->file('image'), $request->file('image'), $account->image);
        $account->update();

        if ($account->type === "collect") {
            $msg = "Collect Updated!";
            return Response([
                'status' => 'collect_success',
                'msg' => $msg,
            ]);
        } else {
            $msg = "Expense Updated!";
            return Response([
                'status' => 'expense_success',
                'msg' => $msg,
            ]);
        }
    }
    public function destory($id)
    {
        $account = Account::find($id);
        $account->delete();

        return Response([
            'status' => 'success',
            'msg' => 'Account deleted!',
        ]);
    }
}
